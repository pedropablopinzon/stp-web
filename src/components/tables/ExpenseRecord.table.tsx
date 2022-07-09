import React from 'react';
import { Button, Table } from 'react-bootstrap';

import { IExpenseRecord } from '../../interfaces/expenseRecord.interface';
import { fixDate } from '../../modules/utils';

export const ExpenseRecordTable = (props: { items: IExpenseRecord[]; onEditDocument: Function; onDeleteDocument: Function }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Creado</th>
            <th>Proyecto</th>
            <th>Monto</th>
            <th>Comentario</th>
            <th>Imagenes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item: IExpenseRecord, index: number) => {
            let createdAt: Date | string | undefined = fixDate(item.createdAt);

            return (
              <tr key={item.documentId}>
                <td>{index + 1}</td>
                <td>{item.documentId}</td>
                <td>{createdAt!.toString()}</td>
                <td>{item.projectName}</td>
                <td>{item.amount}</td>
                <td>{item.comment}</td>
                <td>{item.imagesUrl!.length!}</td>
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
