import React from 'react';
import { Badge } from 'react-bootstrap';
// import Badge from 'react-bootstrap/Badge'

export const AppVersion = () => {
  // @ts-nocheck
  return (
    <>
      <Badge bg="light" text="dark">
        {process.env.REACT_APP_NAME}
      </Badge>
      <Badge bg="light" text="dark">
        {process.env.REACT_APP_VERSION}
      </Badge>
    </>
  );
};
