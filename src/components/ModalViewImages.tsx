import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { CarouselImages } from "./CarouselImages";

export const ModalViewImages = forwardRef(
  (props: { title: string; imagesUrl: string[] }, ref) => {
    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
      show() {
        setShowModal(true);
      },
    }));

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleCloseModal = () => {
      setShowModal(false);
    };

    return (
      <>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CarouselImages items={props.imagesUrl} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
);
