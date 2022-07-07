import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Table, Modal } from "react-bootstrap";

import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Projects() {
  const collectionName = "projects";
  const { currentUser } = useAuth();
  const defaultDocument = {
    documentId: null,
    name: "",
  };

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(defaultDocument);
  const [deletedDocument, setDeletedDocument] = useState(defaultDocument);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleShowModal = () => {
    setSelectedDocument({ documentId: null, name: "" });
    setShowModal(true);
  };

  const saveDocument = () => {
    if (selectedDocument.documentId) {
      updateDocument(selectedDocument);
    } else {
      addDocument(selectedDocument);
    }
    setShowModal(false);
    fetchDocuments().then((data) => setItems(data));
  };

  const removeDocument = () => {
    if (deletedDocument.documentId) {
      deleteDocument(deletedDocument);
      setShowConfirm(false);
      fetchDocuments().then((data) => setItems(data));
    }
  };

  const fetchDocuments = async () => {
    const querySnapshot = await db
      .collection(collectionName)
      .where("status", "==", "ACTIVE")
      .get();

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), documentId: doc.ref.id });
    });
    documents.sort((a, b) => {
      let fa = a.name.toLowerCase();
      let fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    return documents;
  };

  const addDocument = async (document) => {
    db.collection(collectionName)
      .add({
        name: document.name,
        status: "ACTIVE",
        createdAt: new Date(),
        createdBy: currentUser.uid,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const updateDocument = async (document) => {
    await db.collection(collectionName).doc(document.documentId).update({
      name: document.name,
      updatedAt: new Date(),
      updatedBy: currentUser.uid,
    });
  };

  const deleteDocument = async (document) => {
    await db.collection(collectionName).doc(document.documentId).delete();
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setSelectedDocument({ ...selectedDocument, [name]: value });
  };

  useEffect(() => {
    fetchDocuments().then((data) => setItems(data));
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
      <h1>Proyectos</h1>

      <Button variant="primary" onClick={handleShowModal}>
        Nuevo Proyecto
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Nombre:
          <input
            className="ml-3"
            type="text"
            name="name"
            value={selectedDocument.name}
            onChange={onInputChange}
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

      <Modal show={showConfirm} onHide={handleCloseConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Proyecto a Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nombre: {deletedDocument.name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={removeDocument}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.documentId}>
              <td>{item.documentId}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => setSelectedDocument(item)}
                >
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => setDeletedDocument(item)}
                >
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
