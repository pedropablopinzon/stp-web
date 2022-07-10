import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { addDocument, updateDocument, deleteDocument, fetchBusinessUsers } from '../modules/db';
import { sortItemsString, addItem, updateItem, deleteItem } from '../modules/utils';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { Collections } from '../enums/collections';
import { IBusinessUser } from '../interfaces/businessUser.interface';
import { BusinessUsersTable } from '../components/tables/BusinessUsers.table';
import { SelectRol } from '../components/SelectRol';
import { Rol } from '../types/rol.types';

export const BusinessUsers = () => {
  // @ts-ignore
  const { businessId } = useParams();

  const collectionName = Collections.businessUsers;
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

  const [items, setItems] = useState<IBusinessUser[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<IBusinessUser>(defaultDocument);
  const [deletedDocument, setDeletedDocument] = useState<IBusinessUser>(defaultDocument);
  const [selectedRolId, setSelectedRolId] = useState<Rol>('OWNER');

  const handleCloseModal = () => {
    setSelectedDocument(defaultDocument);
    setShowModal(false);
  };

  const handleCloseConfirm = () => {
    setDeletedDocument(defaultDocument);
    setShowConfirm(false);
  };

  const handleShowModal = () => {
    setSelectedDocument(defaultDocument);
    setShowModal(true);
  };

  const saveDocument = async () => {
    if (selectedDocument.documentId) {
      const updateData: IBusinessUser = {
        // userName: selectedDocument.userName,
        rolId: selectedDocument.rolId,
        updatedAt: new Date(),
        updatedBy: currentUser.uid,
        updatedByEmail: currentUser.email,
      };
      updateDocument(collectionName, selectedDocument.documentId, updateData);

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
      const result = await addDocument(collectionName, newData);
      newData.documentId = result.id;

      addItem(items, newData, 'userName');

      setItems(items);
    }
    setShowModal(false);
  };

  const removeDocument = () => {
    if (deletedDocument.documentId) {
      deleteDocument(collectionName, deletedDocument.documentId);

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
      fetchBusinessUsers(businessId).then((data) => {
        sortItemsString(data, 'userName');
        setItems(data);
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

  return (
    <>
      <h1>
        {title} ({items.length})
      </h1>

      <Button variant="primary" onClick={handleShowModal} disabled={businessId.length === 0}>
        Nuevo {titleSingular}
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
