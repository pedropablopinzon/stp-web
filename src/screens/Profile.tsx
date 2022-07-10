import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { ProfileImage } from '../components/ProfileImage';

import { useAuth } from '../contexts/AuthContext';

export const Profile = () => {
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
          <Card.Subtitle>
            <strong>Name:</strong> {currentUser.displayName}
          </Card.Subtitle>
          <Card.Footer>
            <strong>Email:</strong> {currentUser.email}
          </Card.Footer>
          <ProfileImage photoURL="" width="200px" height="200px" />
          {/* <h2 className="text-center mb-4">Home</h2> */}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Link to="/update-password" className="btn btn-warning w-100 mt-3">
            Update Password
          </Link>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};
