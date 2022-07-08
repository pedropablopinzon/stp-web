import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';

import { fetchDocuments, addDocument, updateDocument, deleteDocument } from '../modules/db';
import { sortItems, addItem, updateItem, deleteItem } from '../modules/utils';
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
    setSelectedDocument({ documentId: null, name: '', taxId: '', address: '', status: 'ACTIVE' });
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
      sortItems(data);
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
      <Link to="/home" className="btn btn-primary">
        Home
      </Link>
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
            <input className="ml-3" type="text" name="name" value={selectedDocument.name} onChange={onInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">NIT</Form.Label>
            <input className="ml-3" type="text" name="taxId" value={selectedDocument.taxId} onChange={onInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">DIRECCION</Form.Label>
            <input className="ml-3" type="text" name="address" value={selectedDocument.address} onChange={onInputChange} />
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
