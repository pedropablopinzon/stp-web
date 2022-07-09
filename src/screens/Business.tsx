import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { fetchDocuments, addDocument, updateDocument, deleteDocument } from '../modules/db';
import { sortItemsString, addItem, updateItem, deleteItem } from '../modules/utils';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { BusinessTable } from '../components/tables/Business.table';
import { IBusiness } from '../interfaces/business.interface';

export const Business = () => {
  const collectionName = 'business';
  const title = 'Empresas';
  const titleSingular = 'Empresa';

  const { currentUser } = useAuth();
  const defaultDocument: IBusiness = {
    documentId: null,
    name: '',
    taxId: '',
    address: '',
    status: 'ACTIVE',
  };

  const [items, setItems] = useState<IBusiness[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<IBusiness>(defaultDocument);
  const [deletedDocument, setDeletedDocument] = useState<IBusiness>(defaultDocument);

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
      const newData: IBusiness = {
        name: selectedDocument.name,
        taxId: selectedDocument.taxId,
        address: selectedDocument.address,
        status: 'ACTIVE',
        createdAt: new Date(),
        createdBy: currentUser.uid,
        createdByEmail: currentUser.email,
      };
      const result = await addDocument(collectionName, newData);
      newData.documentId = result.id;

      addItem(items, newData);

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
    fetchDocuments(collectionName).then((data) => {
      sortItemsString(data);
      setItems(data);
    });
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
