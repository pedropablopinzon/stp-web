import React from 'react';
import { Button, Table } from 'react-bootstrap';

import { IBusiness } from '../../interfaces/business.interface';

export const BusinessTable = (props: { items: IBusiness[]; onEditDocument: Function; onDeleteDocument: Function }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Nombre</th>
            <th>NIT</th>
            <th>Direccion</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item: IBusiness, index: number) => (
            <tr key={item.documentId}>
              <td>{index + 1}</td>
              <td>{item.documentId}</td>
              <td>{item.name}</td>
              <td>{item.taxId}</td>
              <td>{item.address}</td>
              <td>{item.status}</td>
              <td>
                <Button variant="primary" onClick={() => props.onEditDocument(item)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => props.onDeleteDocument(item)}>
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
