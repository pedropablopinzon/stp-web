import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { ProfileImage } from './ProfileImage';
import { Storage } from '../components/Storage';

export const UpdateProfile = () => {
  const displayNameRef = useRef();
  const emailRef = useRef();
  const { currentUser, updateEmail, updateProfile } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(currentUser.photoURL || '');
  const history = useHistory();

  function handleSubmit(e: any) {
    e.preventDefault();

    let updateData: boolean = false;
    let data: any = {};

    const promises = [];

    setLoading(true);
    setError('');

    // @ts-ignore
    if (emailRef.current.value !== currentUser.email) {
      // @ts-ignore
      promises.push(updateEmail(emailRef.current.value));
    }

    // @ts-ignore
    if (displayNameRef.current.value !== currentUser.displayName) {
      updateData = true;
      // @ts-ignore
      data.displayName = displayNameRef.current.value;
      // promises.push(updateProfile(displayNameRef.current.value));
    }

    if (photoURL !== currentUser.photoURL) {
      updateData = true;
      data.photoURL = photoURL;
    }

    if (updateData) {
      // @ts-ignore
      promises.push(updateProfile(data));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/profile');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const fileUploaded = (url: string) => {
    setPhotoURL(url);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="displayName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                // @ts-ignore
                ref={displayNameRef}
                required
                defaultValue={currentUser.displayName}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // @ts-ignore
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="photoURL">
              <ProfileImage photoURL={photoURL} width="200px" height="200px" />
            </Form.Group>
            <Storage onFileUploaded={fileUploaded} />
            <Button disabled={loading} className="w-100" type="submit">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/profile">Cancel</Link>
      </div>
    </>
  );
};
