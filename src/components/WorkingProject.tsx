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
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{workingProjectName}</Card.Title>
          <Card.Subtitle>{currentUser.email}</Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};
