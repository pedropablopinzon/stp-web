import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import {
  addDocument,
  updateDocument,
  deleteDocument,
  getDocumentReference,
  setDocument,
  getBusinessesByUser,
  fetchBusinesses,
  getBusinessesByUserAndRol,
} from '../modules/db';
import { sortItemsString, addItem, updateItem, deleteItem } from '../modules/utils';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { BusinessTable } from '../components/tables/Business.table';
import { IBusiness } from '../interfaces/business.interface';
import { Collections } from '../enums/collections';
import { IBusinessUser } from '../interfaces/businessUser.interface';

export const Businesses = () => {
  const collectionName = Collections.businesses;
  const title = 'Empresas';
  const titleSingular = 'Empresa';

  const { currentUser } = useAuth();
  const defaultDocument: IBusiness = {
    documentId: null,
    name: '',
    taxId: '',
    address: '',
    businessId: '',
    status: 'ACTIVE',
  };

  const [items, setItems] = useState<IBusiness[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<IBusiness>(defaultDocument);
  const [deletedDocument, setDeletedDocument] = useState<IBusiness>(defaultDocument);
  const [businessesByUser, setBusinessesByUser] = useState<IBusinessUser[]>([]);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleShowModal = () => {
    setSelectedDocument(defaultDocument);
    setShowModal(true);
  };

  const saveDocument = async () => {
    if (selectedDocument.documentId) {
      const updateData: IBusiness = {
        name: selectedDocument.name,
        taxId: selectedDocument.taxId,
        address: selectedDocument.address,
        updatedAt: new Date(),
        updatedBy: currentUser.uid,
        updatedByEmail: currentUser.email,
      };
      updateDocument(collectionName, selectedDocument.documentId, updateData);

      const updatedItems: any[] = updateItem(items, selectedDocument.documentId, updateData);

      setItems(updatedItems);
    } else {
      const newBusinessData: IBusiness = {
        name: selectedDocument.name,
        taxId: selectedDocument.taxId,
        address: selectedDocument.address,
        businessId: '',
        status: 'ACTIVE',
        createdAt: new Date(),
        createdBy: currentUser.uid,
        createdByEmail: currentUser.email,
      };
      const docRef = await getDocumentReference(collectionName);
      newBusinessData.businessId = docRef.id;

      const resultBusiness = await setDocument(docRef, newBusinessData);

      const newBusinessUserData: IBusinessUser = {
        businessId: newBusinessData.businessId,
        userId: currentUser.uid,
        rolId: 'OWNER',
        status: 'ACTIVE',
        createdAt: new Date(),
        createdBy: currentUser.uid,
        createdByEmail: currentUser.email,
      };

      const resultBusinessUser = await addDocument(Collections.businessUsers, newBusinessUserData);
      newBusinessUserData.documentId = resultBusinessUser.id;

      // const result = await addDocument(collectionName, newData);
      // newData.documentId = result.id;
      newBusinessData.documentId = docRef.id;

      addItem(items, newBusinessData);

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

  useEffect(() => {
    getBusinessesByUserAndRol(currentUser.uid).then((data: IBusinessUser[]) => {
      setBusinessesByUser(data);
    });
  }, []);

  useEffect(() => {
    if (businessesByUser.length > 0) {
      fetchBusinesses(businessesByUser).then((data: IBusiness[]) => {
        sortItemsString(data);
        setItems(data);
      });
    }
  }, [businessesByUser]);

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

  return (
    <>
      <h1>
        {title} ({items.length})
      </h1>

      <Button variant="primary" onClick={handleShowModal}>
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
              placeholder="Ingrese el Nombre de la empresa"
              name="name"
              value={selectedDocument.name}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">NIT</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el NIT de la empresa"
              name="taxId"
              value={selectedDocument.taxId}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Direccion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la Direccion de la empresa"
              name="address"
              value={selectedDocument.address}
              onChange={onInputChange}
            />
          </Form.Group>
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
        subtitle={`Nombre: ${deletedDocument.name}`}
      />

      <BusinessTable items={items} onEditDocument={setSelectedDocument} onDeleteDocument={setDeletedDocument} />
    </>
  );
};
