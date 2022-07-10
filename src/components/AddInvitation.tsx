import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { IBusiness } from '../interfaces/business.interface';

export const AddInvitation = (props: { show: boolean; onHide: Function; business?: IBusiness }) => {
  const sendInvitation = () => {};

  const [email, setEmail] = useState<string>('');

  const onInputChange = (event: any) => {
    const { name, value } = event.target;

    setEmail(value);
  };

  return (
    <>
      <h1>Add Invitation</h1>
      <Modal
        show={props.show}
        // @ts-ignore
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Invitar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Email</Form.Label>
            <Form.Control type="email" placeholder="Ingrese el Email del usuario" name="email" value={email} onChange={onInputChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            // @ts-ignore
            onClick={props.onHide}
          >
            Cerrar
          </Button>
          <Button variant="primary" onClick={sendInvitation}>
            Enviar Invitacion
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
