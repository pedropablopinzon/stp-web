import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { AiFillGoogleCircle } from 'react-icons/ai';

import { useAuth } from '../contexts/AuthContext';
import firebaseApp, { signInWithGoogle } from '../firebase';

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
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

    try {
      setError('');
      setLoading(true);
      // @ts-ignore
      await login(emailRef.current!.value, passwordRef.current!.value);
      history.push('/home');
      //history.push("/")
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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
            <Button disabled={loading} className="w-100" type="submit">
              <MdEmail className="mr-2" />
              Log In
            </Button>
            <Button disabled={loading} className="w-100 mt-2" onClick={signInWithGoogle}>
              <AiFillGoogleCircle className="mr-2" />
              <i className="fab fa-google"></i>Log In with Google
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};
