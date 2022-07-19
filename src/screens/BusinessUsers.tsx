import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { createBusinessUserAPI, deleteBusinessUserAPI, getBusinessUsersAPI, updateBusinessUserAPI } from '../api/BusinessUsersAPI';
import { readBusinessAPI } from '../api/BusinessesAPI';
import { sortItemsString, addItem, updateItem, deleteItem } from '../common/Utils';
import { useAuth } from '../contexts/AuthContext';
import { IBusinessUser } from '../interfaces/BusinessUser.interface';
import { IResult } from '../interfaces/Result.interface';
import { IBusiness } from '../interfaces/Business.interface';
import { Rol } from '../types/Rol.types';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { BusinessUsersTable } from '../components/tables/BusinessUsers.table';
import { SelectRol } from '../components/SelectRol';
import { AddInvitation } from '../components/AddInvitation';
import { Notification } from '../components/Notification';

export const BusinessUsers = () => {
  // @ts-ignore
  const { businessId } = useParams();

  const title = 'Usuarios';
  const titleSingular = 'Usuario';

  const { currentUser } = useAuth();
  const defaultDocument: IBusinessUser = {
    documentId: null,
    userName: '',
    businessId: '',
    rolId: 'OWNER',
    status: 'ACTIVE',
  };

  const defaultBusinessDocument: IBusiness = {
    documentId: null,
    name: '',
    taxId: '',
    address: '',
    businessId: '',
    status: 'ACTIVE',
  };

  const defaultResult: IResult = { status: false, message: '', show: false, variant: 'Primary', title: '', subtitle: '' };

  const [items, setItems] = useState<IBusinessUser[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<IBusinessUser>(defaultDocument);
  const [deletedDocument, setDeletedDocument] = useState<IBusinessUser>(defaultDocument);
  const [selectedRolId, setSelectedRolId] = useState<Rol>('OWNER');
  const [selectedDocumentAddInvitation, setSelectedDocumentAddInvitation] = useState<IBusiness>(defaultBusinessDocument);
  const [showNotification, setShowNotification] = useState<IResult>(defaultResult);

  const handleCloseModal = () => {
    setSelectedDocument(defaultDocument);
    setShowModal(false);
  };

  const handleOnSendInvitation = (result: IResult) => {
    setShowNotification(result);

    const timeout = setTimeout(() => {
      setShowNotification(defaultResult);
    }, 5000);
  };

  const handleCloseConfirm = () => {
    setDeletedDocument(defaultDocument);
    setShowConfirm(false);
  };

  const handleShowModal = () => {
    // @ts-ignore
    childRefAddInvitation.current.show();
  };

  const saveDocument = async () => {
   if (selectedDocument.documentId) {
      const updateData: IBusinessUser = {
        rolId: selectedRolId,
        updatedAt: new Date(),
        updatedBy: currentUser.uid,
        updatedByEmail: currentUser.email,
      };
      const result = await updateBusinessUserAPI(currentUser, selectedDocument.documentId, updateData);

      const updatedItems = updateItem(items, selectedDocument.documentId, updateData, 'userName');

      setItems(updatedItems);
    } else {
      const newData: IBusinessUser = {
        email: currentUser.email,
        userName: selectedDocument.userName,
        rolId: selectedDocument.rolId,
        businessId: businessId,
        status: 'ACTIVE',
        createdAt: new Date(),
        createdBy: currentUser.uid,
        createdByEmail: currentUser.email,
      };

      const result = await createBusinessUserAPI(currentUser, newData);

      addItem(items, result, 'userName');

      setItems(items);
    }
    setShowModal(false);
  };

  const removeDocument = async () => {
    if (deletedDocument.documentId) {
      const result = await deleteBusinessUserAPI(currentUser, deletedDocument.documentId);

      const newItems = deleteItem(items, deletedDocument.documentId);

      setItems(newItems);
      setShowConfirm(false);
    }
  };

  const onInputChange = (event: any) => {
    const { name, value } = event.target;

    setSelectedDocument({ ...selectedDocument, [name]: value });
  };

  const onSelectedRol = (value: Rol) => {
    setSelectedRolId(value);
  };

  useEffect(() => {
    if (businessId.length > 0) {
      getBusinessUsersAPI(businessId).then((data) => {
        sortItemsString(data, 'userName');
        setItems(data);
        readBusinessAPI(currentUser, businessId).then((data: any) => {
          if (data) {
            setSelectedDocumentAddInvitation(data);
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (selectedDocument.documentId) {
      setShowModal(true);
    }
  }, [selectedDocument]);

  useEffect(() => {
    if (deletedDocument.documentId) {
      setShowConfirm(true);
    }
  }, [deletedDocument]);

  useEffect(() => {
    if (selectedRolId.length > 0) {
      setSelectedDocument({ ...selectedDocument, rolId: selectedRolId });
    }
  }, [selectedRolId]);

  const childRefAddInvitation = useRef();

  return (
    <>
      <h1>
        {title} ({items.length})
      </h1>

      <Button variant="primary" onClick={handleShowModal} disabled={businessId.length === 0}>
        Invitar Usuario
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{titleSingular}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el Nombre del usuario"
              name="userName"
              value={selectedDocument.userName}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el Email del usuario"
              name="email"
              value={selectedDocument.email}
              onChange={onInputChange}
            />
          </Form.Group>
          <SelectRol
            onSelectedRol={onSelectedRol}
            // @ts-ignore
            rolId={selectedDocument.rolId}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveDocument}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <AddInvitation
        ref={childRefAddInvitation}
        business={selectedDocumentAddInvitation}
        onSendInvitation={handleOnSendInvitation}
        subtitle={selectedDocumentAddInvitation.name}
      />

      <Notification
        show={showNotification.show}
        message={showNotification.message}
        variant={showNotification.variant}
        title={showNotification.title}
        subtitle={showNotification.subtitle}
      />

      <ConfirmDelete
        show={showConfirm}
        onHide={handleCloseConfirm}
        handleAcceptConfirm={removeDocument}
        title={`${titleSingular} a Eliminar`}
        subtitle={`Nombre: ${deletedDocument.userName}`}
      />

      <BusinessUsersTable items={items} onEditDocument={setSelectedDocument} onDeleteDocument={setDeletedDocument} />
    </>
  );
};
