import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ConfirmDelete = ({ show, onHide, title, subtitle, handleAcceptConfirm }) => {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{subtitle}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleAcceptConfirm}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
