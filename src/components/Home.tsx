import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import Menu from './Menu';

export default function Home() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      console.log(error);
      setError('Failed to log out');
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          {/* <h2 className="text-center mb-4">Home</h2> */}
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
