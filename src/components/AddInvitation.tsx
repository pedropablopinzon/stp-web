import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import { IBusiness } from '../interfaces/business.interface';
import { IResult } from '../interfaces/result.interface';
import { addInvitation } from '../modules/db';
import { Rol } from '../types/rol.types';
import { SelectRol } from './SelectRol';

export const AddInvitation = (props: { show: boolean; onHide: Function; business?: IBusiness; onSendInvitation: Function }) => {
  const { currentUser } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [selectedRolId, setSelectedRolId] = useState<Rol>('OWNER');

  const onInputChange = (event: any) => {
    const { name, value } = event.target;

    setEmail(value);
  };

  const sendInvitation = async () => {
    // @ts-ignore
    const result: IResult = await addInvitation(currentUser, email, selectedRolId, props.business.documentId, props.business.name);
    setEmail('');
    props.onSendInvitation(result);
  };

  const onSelectedRol = (value: Rol) => {
    setSelectedRolId(value);
  };

  return (
    <>
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
          <SelectRol onSelectedRol={onSelectedRol} rolId={selectedRolId} />
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
