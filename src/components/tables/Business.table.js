import React from 'react';
import { Button, Table } from 'react-bootstrap';

export const BusinessTable = ({ items, onEditDocument, onDeleteDocument }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Nombre</th>
            <th>NIT</th>
            <th>DIRECCION</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.documentId}>
              <td>{index + 1}</td>
              <td>{item.documentId}</td>
              <td>{item.name}</td>
              <td>{item.taxId}</td>
              <td>{item.address}</td>
              <td>{item.status}</td>
              <td>
                <Button variant="primary" onClick={() => onEditDocument(item)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => onDeleteDocument(item)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
