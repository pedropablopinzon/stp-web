import React from 'react';
import { Button, Table } from 'react-bootstrap';

import { IBusinessUser } from '../../interfaces/businessUser.interface';
import { fixDate } from '../../modules/utils';

export const BusinessUsersTable = (props: { items: IBusinessUser[]; onEditDocument: Function; onDeleteDocument: Function }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Creado</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item: IBusinessUser, index: number) => {
            let createdAt: Date | string | undefined = fixDate(item.createdAt);

            return (
              <tr key={item.documentId}>
                <td>{index + 1}</td>
                <td>{item.documentId}</td>
                <td>{createdAt!.toString()}</td>
                <td>{item.userName}</td>
                <td>{item.rolId}</td>
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
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
