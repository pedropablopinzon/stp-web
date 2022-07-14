import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import {
  addDocument,
  updateDocument,
  deleteDocument,
  fetchProjects,
} from "../api/stpAPI/db";
import {
  sortItemsString,
  addItem,
  updateItem,
  deleteItem,
} from "../modules/utils";
import { useAuth } from "../contexts/AuthContext";
import { ConfirmDelete } from "../components/ConfirmDelete";
import { ProjectsTable } from "../components/tables/Projects.table";
import { IProject } from "../interfaces/project.interface";
import { Collections } from "../enums/collections";
import { useHistory } from "react-router-dom";

export const Projects = () => {
  const collectionName = Collections.projects;
  const title = "Proyectos";
  const titleSingular = "Proyecto";

  const { currentUser } = useAuth();
  const history = useHistory();

  const defaultDocument: IProject = {
    documentId: null,
    name: "",
    businessId: "",
    businessName: "",
    status: "ACTIVE",
  };
  const workingBusinessId: string =
    localStorage.getItem("workingBusinessId") || "";
  const workingBusinessName: string =
    localStorage.getItem("workingBusinessName") || "";

  const [items, setItems] = useState<IProject[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] =
    useState<IProject>(defaultDocument);
  const [deletedDocument, setDeletedDocument] =
    useState<IProject>(defaultDocument);
  const [projectReportDocument, setProjectReportDocument] =
    useState<IProject>(defaultDocument);

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
      const updateData: IProject = {
        name: selectedDocument.name,
        updatedAt: new Date(),
        updatedBy: currentUser.uid,
        updatedByEmail: currentUser.email,
      };
      updateDocument(collectionName, selectedDocument.documentId, updateData);

      const updatedItems = updateItem(
        items,
        selectedDocument.documentId,
        updateData
      );

      setItems(updatedItems);
    } else {
      const newData: IProject = {
        name: selectedDocument.name,
        businessId: workingBusinessId,
        businessName: workingBusinessName,
        status: "ACTIVE",
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
    if (workingBusinessId.length > 0) {
      fetchProjects(workingBusinessId).then((data) => {
        sortItemsString(data, "name");
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
    if (projectReportDocument.documentId) {
      history.push(`/projectReport/${projectReportDocument.documentId}`);
    }
  }, [projectReportDocument]);

  return (
    <>
      <h1>
        {title} ({items.length})
      </h1>

      <Button
        variant="primary"
        onClick={handleShowModal}
        disabled={workingBusinessId.length === 0}
      >
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
              placeholder="Ingrese el Nombre del proyecto"
              name="name"
              value={selectedDocument.name}
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

      <ProjectsTable
        items={items}
        onEditDocument={setSelectedDocument}
        onDeleteDocument={setDeletedDocument}
        onReportDocument={setProjectReportDocument}
      />
    </>
  );
};
