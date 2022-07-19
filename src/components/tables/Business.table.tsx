import React from 'react';
import { Button, Table } from 'react-bootstrap';

import { IBusiness } from '../../interfaces/Business.interface';
import { fixDate, showDetailedData } from '../../common/Utils';

export const BusinessTable = (props: {
  items: IBusiness[];
  onEditDocument: Function;
  onDeleteDocument: Function;
  onAddInvitation: Function;
  onUsersDocument: Function;
}) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {showDetailedData() && <th>#</th>}
            {showDetailedData() && <th>Creado</th>}
            <th>Nombre</th>
            <th>NIT</th>
            <th>Direccion</th>
            {showDetailedData() && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {props.items.map((item: IBusiness, index: number) => {
            let createdAt: Date | string | undefined = fixDate(item.createdAt);

            return (
              <tr key={item.documentId}>
                <td>{index + 1}</td>
                {showDetailedData() && <td>{item.documentId}</td>}
                {showDetailedData() && <td>{createdAt!.toString()}</td>}
                <td>{item.name}</td>
                <td>{item.taxId}</td>
                <td>{item.address}</td>
                {showDetailedData() && <td>{item.status}</td>}
                <td>
                  <Button variant="primary" onClick={() => props.onUsersDocument(item)}>
                    Usuarios
                  </Button>
                </td>
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
                <td>
                  <Button variant="primary" onClick={() => props.onAddInvitation(item)}>
                    Invitar Usuario
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
