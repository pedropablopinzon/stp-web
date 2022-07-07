import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Modal, Form } from 'react-bootstrap';

import { fetchDocuments, addDocument, updateDocument, deleteDocument } from '../modules/db';
import { sortItems, addItem, updateItem, deleteItem } from '../modules/utils';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmDelete } from '../components/ConfirmDelete';

export default function Projects() {
  const collectionName = 'projects';
  const title = 'Proyectos';
  const titleSingular = 'Proyecto';

  const { currentUser } = useAuth();
  const defaultDocument = {
    documentId: null,
    name: '',
  };

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(defaultDocument);
  const [deletedDocument, setDeletedDocument] = useState(defaultDocument);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleShowModal = () => {
    setSelectedDocument({ documentId: null, name: '' });
    setShowModal(true);
  };

  const saveDocument = async () => {
    if (selectedDocument.documentId) {
      const document = {
        name: selectedDocument.name ?? '',
        updatedAt: new Date(),
        updatedBy: currentUser.uid,
      };
      updateDocument(collectionName, selectedDocument.documentId, document);

      const updatedItems = updateItem(items, selectedDocument.documentId, document);

      setItems(updatedItems);
    } else {
      const document = {
        name: selectedDocument.name ?? '',
        status: 'ACTIVE',
        createdAt: new Date(),
        createdBy: currentUser.uid,
      };
      const result = await addDocument(collectionName, document);
      document.documentId = result.id;

      addItem(items, document);

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

  const onInputChange = (event) => {
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
    console.log('xx');
    console.log(deletedDocument);
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Nombre</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.documentId}>
              <td>{index + 1}</td>
              <td>{item.documentId}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>
                <Button variant="primary" onClick={() => setSelectedDocument(item)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => setDeletedDocument(item)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
