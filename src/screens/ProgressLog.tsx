import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { WorkingProject } from '../components/WorkingProject';
import { useAuth } from '../contexts/AuthContext';
import { IProgressLog } from '../interfaces/progressLog.interface';
import { addDocument } from '../modules/db';

export const ProgressLog = () => {
  const { currentUser } = useAuth();
  const collectionName = 'progressLog';
  const defaultDocument: IProgressLog = {
    documentId: null,
    projectId: '',
    projectName: '',
    comment: '',
    status: 'ACTIVE',
  };

  const workingProjectId = localStorage.getItem('workingProjectId');
  const workingProjectName = localStorage.getItem('workingProjectName');
  const workingProjectCheckInAt = localStorage.getItem('workingProjectCheckInAt');

  const [items, setItems] = useState<any[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<IProgressLog>(defaultDocument);

  const saveDocument = async () => {
    const newData: IProgressLog = {
      projectId: workingProjectId!,
      projectName: workingProjectName!,
      comment: selectedDocument.comment!,
      createdByEmail: currentUser.email,

      status: 'ACTIVE',
      createdAt: new Date(),
      createdBy: currentUser.uid,
    };
    const result = await addDocument(collectionName, newData);
    newData.documentId = result.id;

    items.push(newData);

    setItems(items);
    setSelectedDocument(defaultDocument);
  };

  const onInputChange = (event: any) => {
    const { name, value } = event.target;

    setSelectedDocument({ ...selectedDocument, [name]: value });
  };

  return (
    <>
      <h1>Progreso</h1>
      <WorkingProject />

      <Card>
        <Card.Body>
          <Card.Title>Comentario</Card.Title>
          <textarea
            id="w3review"
            name="w3review"
            // @ts-ignore
            rows="4"
            // @ts-ignore
            cols="50"
            // @ts-ignore
            name="comment"
            value={selectedDocument.comment}
            onChange={onInputChange}
          ></textarea>
          <br />
          <Button variant="primary" onClick={saveDocument}>
            Agregar Comentario
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
