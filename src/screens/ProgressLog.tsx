import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { addDocument, updateDocument, deleteDocument } from '../modules/db';
import { addItem, updateItem, deleteItem, sortItems } from '../modules/utils';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmDelete } from '../components/ConfirmDelete';
import { IProgressLog } from '../interfaces/progressLog.interface';
import { ProgressLogTable } from '../components/tables/ProgressLog.table';
import { db } from '../firebase';
import { WorkingProject } from '../components/WorkingProject';
import { Storage } from '../components/Storage';
import { CarouselImages } from '../components/CarouselImages';

export const ProgressLog = () => {
  const collectionName = 'progressLog';
  const title = 'Progreso';
  const titleSingular = 'Progreso';

  const { currentUser } = useAuth();
  const defaultDocument: IProgressLog = {
    documentId: null,
    comment: '',
    imagesUrl: [],
    status: 'ACTIVE',
  };

  let workingProjectId = localStorage.getItem('workingProjectId');
  const workingProjectName = localStorage.getItem('workingProjectName');
  const workingProjectCheckInAt = localStorage.getItem('workingProjectCheckInAt');
  if (!workingProjectId) {
    workingProjectId = '';
  }

  const [items, setItems] = useState<IProgressLog[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<IProgressLog>(defaultDocument);
  const [deletedDocument, setDeletedDocument] = useState<IProgressLog>(defaultDocument);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleShowModal = () => {
    setSelectedDocument(defaultDocument);
    setShowModal(true);
  };

  const saveDocument = async () => {
    if (selectedDocument.documentId) {
      const updateData: IProgressLog = {
        comment: selectedDocument.comment,
        imagesUrl: selectedDocument.imagesUrl,
        updatedAt: new Date(),
        updatedBy: currentUser.uid,
        updatedByEmail: currentUser.email,
      };
      updateDocument(collectionName, selectedDocument.documentId, updateData);

      const updatedItems = updateItem(items, selectedDocument.documentId, updateData, 'createdAtNumber', 'number', 'desc');

      setItems(updatedItems);
    } else {
      const newData: IProgressLog = {
        projectId: workingProjectId!,
        projectName: workingProjectName!,
        comment: selectedDocument.comment,
        imagesUrl: selectedDocument.imagesUrl,
        status: 'ACTIVE',
        createdAt: new Date(),
        createdAtNumber: new Date().getTime(),
        createdBy: currentUser.uid,
        createdByEmail: currentUser.email,
      };
      const result = await addDocument(collectionName, newData);
      newData.documentId = result.id;

      addItem(items, newData, 'createdAtNumber', 'number', 'desc');

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

  const fetchDocuments = async (collectionName: string) => {
    const querySnapshot = await db
      .collection(collectionName)
      .where('status', '==', 'ACTIVE')
      .where('projectId', '==', workingProjectId)
      .get();

    const documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), documentId: doc.ref.id });
    });
    return documents;
  };

  const fileUploaded = (url: string) => {
    // @ts-ignore
    selectedDocument.imagesUrl.push(url);
    setSelectedDocument({ ...selectedDocument });
  };

  useEffect(() => {
    fetchDocuments(collectionName).then((data) => {
      sortItems(data, 'createdAtNumber', 'desc');
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
      <WorkingProject />
      <h1>
        {title} ({items.length})
      </h1>

      <Button
        variant="primary"
        onClick={handleShowModal}
        // @ts-ignore
        disabled={workingProjectId.length === 0}
      >
        Nuevo {titleSingular}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{titleSingular}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Comentario</Form.Label>
            <Form.Control as="textarea" rows={3} name="comment" value={selectedDocument.comment} onChange={onInputChange} />
          </Form.Group>
          <Storage onFileUploaded={fileUploaded} />
          <CarouselImages items={selectedDocument.imagesUrl} />
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
        subtitle={`Comentario: ${deletedDocument.comment}`}
      />

      <ProgressLogTable items={items} onEditDocument={setSelectedDocument} onDeleteDocument={setDeletedDocument} />
    </>
  );
};
