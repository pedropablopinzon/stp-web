import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { AiFillGoogleCircle } from 'react-icons/ai';

import { useAuth } from '../contexts/AuthContext';
import firebaseApp, { signInWithGoogle } from '../firebase';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signupEmail } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [userProvider, setUserProvider] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user: any) => {
      setUserProvider(user);
    });
  }, []);

  useEffect(() => {
    if (userProvider) {
      history.push('/home');
    }
  }, [userProvider]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    // @ts-ignore
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      // @ts-ignore
      await signupEmail(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // @ts-ignore
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                // @ts-ignore
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                // @ts-ignore
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              <MdEmail className="mr-2" />
              Sign Up
            </Button>
            <Button className="w-100 mt-2" onClick={signInWithGoogle}>
              <AiFillGoogleCircle className="mr-2" />
              <i className="fab fa-google"></i>Sign In with Google
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
