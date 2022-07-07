import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Table, Modal } from "react-bootstrap";

import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Projects() {
  const { currentUser } = useAuth();

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProject, setSelectedProject] = useState({
    documentId: null,
    name: "",
  });
  const [deletedProject, setDeletedProject] = useState({
    documentId: null,
    name: "",
  });

  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleShowModal = () => {
    setSelectedProject({ documentId: null, name: "" });
    setShowModal(true);
  };

  const saveProject = () => {
    if (selectedProject.documentId) {
      updateProject(selectedProject);
    } else {
      createProject(selectedProject);
    }
    setShowModal(false);
    fetchProjects().then((data) => setItems(data));
  };

  const deleteProject = () => {
    if (deletedProject.documentId) {
      removeProject(deletedProject);
      setShowConfirm(false);
      fetchProjects().then((data) => setItems(data));
    }
  };

  const fetchProjects = async () => {
    const querySnapshot = await db
      .collection("projects")
      .where("status", "==", "ACTIVE")
      .get();

    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ ...doc.data(), documentId: doc.ref.id });
    });
    projects.sort((a, b) => {
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
    return projects;
  };

  const createProject = async (project) => {
    db.collection("projects")
      .add({
        name: project.name,
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

  const updateProject = async (project) => {
    await db.collection("projects").doc(project.documentId).update({
      name: project.name,
      updatedAt: new Date(),
      updatedBy: currentUser.uid,
    });
  };

  const removeProject = async (project) => {
    await db.collection("projects").doc(project.documentId).delete();
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setSelectedProject({ ...selectedProject, [name]: value });
  };

  useEffect(() => {
    fetchProjects().then((data) => setItems(data));
  }, []);

  useEffect(() => {
    if (selectedProject.documentId) {
      setShowModal(true);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (deletedProject.documentId) {
      setShowConfirm(true);
    }
  }, [deletedProject]);

  return (
    <>
      <Link to="/home" className="btn btn-primary">
        Home
      </Link>
      <h1>Projects</h1>

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
            value={selectedProject.name}
            onChange={onInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveProject}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirm} onHide={handleCloseConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Proyecto a Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nombre: {deletedProject.name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={deleteProject}>
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
                  onClick={() => setSelectedProject(item)}
                >
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => setDeletedProject(item)}
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
