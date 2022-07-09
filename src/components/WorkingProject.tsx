import React from 'react';
import { Card } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';

export const WorkingProject = () => {
  const { currentUser } = useAuth();

  const workingProjectId = localStorage.getItem('workingProjectId');
  const workingProjectName = localStorage.getItem('workingProjectName');
  const workingProjectCheckInAt = localStorage.getItem('workingProjectCheckInAt');

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Proyecto: {workingProjectName}</Card.Title>
          <Card.Subtitle>
            <strong>Name:</strong> {currentUser.displayName}
          </Card.Subtitle>
          <Card.Footer>
            <strong>Email:</strong> {currentUser.email}
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};
