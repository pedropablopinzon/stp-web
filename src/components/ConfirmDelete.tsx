import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ConfirmDelete = (props: {
  show: boolean;
  onHide: any;
  title: string;
  subtitle: string;
  handleAcceptConfirm: Function;
  acceptButtonText?: string;
}) => {
  const acceptButtonText: string = props.acceptButtonText || 'Eliminar';

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.subtitle}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onHide()}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={() => props.handleAcceptConfirm()}>
            {acceptButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
