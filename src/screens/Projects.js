import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Table } from "react-bootstrap";

import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import ModalProject from "../modals/ModalProject";

export default function Projects() {
  const { currentUser } = useAuth();

  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  const fetchProjects = async () => {
    const querySnapshot = await db
      .collection("projects")
      .where("status", "==", "ACTIVE")
      .get();

    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ ...doc.data(), documentId: doc.ref.id });
    });
    return projects;
  };

  useEffect(() => {
    fetchProjects().then((data) => setItems(data));
  }, []);

  const onSave = (project) => {
    console.log(project);
    createProject(project);
    console.log("guardando....");
    setShow(false);
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

    fetchProjects().then((data) => setItems(data));
  };

  return (
    <>
      <Link to="/home" className="btn btn-primary">
        Home
      </Link>
      <h1>Projects</h1>
      <button onClick={() => setShow(true)}>Nuevo Proyecto</button>
      <ModalProject
        title="My Modal"
        onClose={() => setShow(false)}
        show={show}
        onSave={(data) => onSave(data)}
      >
        <p>This is modal body</p>
      </ModalProject>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((log) => (
            <tr key={log.documentId}>
              <td>{log.documentId}</td>
              <td>{log.name}</td>
              <td>{log.status}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
