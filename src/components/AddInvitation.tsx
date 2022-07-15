import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { addInvitationAPI } from '../api/InvitationsAPI';
import { useAuth } from '../contexts/AuthContext';
import { IBusiness } from '../interfaces/Business.interface';
import { IResult } from '../interfaces/Result.interface';
import { Rol } from '../types/Rol.types';
import { SelectRol } from './SelectRol';

export const AddInvitation = forwardRef((props: { business?: IBusiness; onSendInvitation: Function; subtitle?: string }, ref) => {
  useImperativeHandle(ref, () => ({
    show() {
      setShowModal(true);
    },
  }));

  const { currentUser } = useAuth();

  useImperativeHandle(ref, () => ({
    show() {
      setShowModal(true);
    },
  }));

  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [selectedRolId, setSelectedRolId] = useState<Rol>('OWNER');

  const onInputChange = (event: any) => {
    const { name, value } = event.target;

    setEmail(value);
  };

  const sendInvitation = async () => {
    // @ts-ignore
    const result: IResult = await addInvitationAPI(currentUser, email, selectedRolId, props.business.documentId, props.business.name);
    setEmail('');
    props.onSendInvitation(result);
    setShowModal(false);
  };

  const onSelectedRol = (value: Rol) => {
    setSelectedRolId(value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Invitar - {props.subtitle}</Modal.Title>
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
});
