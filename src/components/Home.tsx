import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { WorkingBusiness } from './WorkingBusiness';
import { Invitations } from './Invitations';

export const Home = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      console.error(error);
      setError('Failed to log out');
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Subtitle>
            <strong>Name:</strong> {currentUser.displayName}
          </Card.Subtitle>
          <Card.Footer>
            <strong>Email:</strong> {currentUser.email}
          </Card.Footer>
        </Card.Body>
      </Card>
      <WorkingBusiness />
      <Invitations />
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};
