// @ts-nocheck

import React from 'react';
import { Badge } from 'react-bootstrap';
// import Badge from 'react-bootstrap/Badge'

export const AppVersion = () => {
  return (
    <>
      <div className="w-100 text-center mt-2">
        <Badge bg="light" text="dark">
          {process.env.REACT_APP_NAME}
        </Badge>
        <Badge bg="light" text="dark">
          {process.env.REACT_APP_VERSION}
        </Badge>
      </div>
    </>
  );
};
