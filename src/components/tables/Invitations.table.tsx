import React from 'react';
import { Button, Table } from 'react-bootstrap';

import { IInvitation } from '../../interfaces/invitation.interface';
import { fixDate, showDetailedData } from '../../common/utils';

export const InvitationsTable = (props: { items: IInvitation[]; onAcceptInvitation: Function; onRejectInvitation: Function }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {showDetailedData() && <th>#</th>}
            {showDetailedData() && <th>Creado</th>}
            <th>Nombre</th>
            <th>Rol</th>
            {showDetailedData() && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {props.items.map((item: IInvitation, index: number) => {
            let createdAt: Date | string | undefined = fixDate(item.createdAt);

            return (
              <tr key={item.documentId}>
                <td>{index + 1}</td>
                {showDetailedData() && <td>{item.documentId}</td>}
                {showDetailedData() && <td>{createdAt!.toString()}</td>}
                <td>{item.businessName}</td>
                <td>{item.rolId}</td>
                {showDetailedData() && <td>{item.status}</td>}
                <td>
                  <Button variant="primary" onClick={() => props.onAcceptInvitation(item)}>
                    Aceptar
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => props.onRejectInvitation(item)}>
                    Rechazar
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
