import React, { useState } from 'react';
import { Col, Row, Toast } from 'react-bootstrap';

export const Notification = (props: { show: boolean; message: string; variant: string; title: string; subtitle: string }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => {
              setShow(false);
            }}
            show={show || props.show}
            delay={3000}
            autohide
            className="d-inline-block m-1"
            // @ts-ignore
            bg={props.variant.toLowerCase()}
          >
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">{props.title}</strong>
              <small>{props.subtitle}</small>
            </Toast.Header>
            <Toast.Body
              // @ts-ignore
              className={props.variant === 'Dark' && 'text-white'}
            >
              {props.message}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </>
  );
};
