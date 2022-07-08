import React from 'react';
import { Button, Table } from 'react-bootstrap';

export const ProjectsTable = (props: { items: any[]; onEditDocument: Function; onDeleteDocument: Function }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Nombre</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, index) => (
            <tr key={item.documentId}>
              <td>{index + 1}</td>
              <td>{item.documentId}</td>
              <td>{item.name}</td>
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
