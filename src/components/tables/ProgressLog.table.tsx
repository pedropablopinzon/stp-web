import React from "react";
import { Button, Table } from "react-bootstrap";

import { IProgressLog } from "../../interfaces/progressLog.interface";
import { fixDate, showDetailedData } from "../../modules/utils";

export const ProgressLogTable = (props: {
  items: IProgressLog[];
  onEditDocument: Function;
  onDeleteDocument: Function;
  onViewImagesDocument: Function;
  editable: boolean;
}) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {showDetailedData() && <th>#</th>}
            {showDetailedData() && <th>Creado</th>}
            {showDetailedData() && <th>Proyecto</th>}
            <th>Comentario</th>
            <th>Imagenes</th>
            {showDetailedData() && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {props.items.map((item: IProgressLog, index: number) => {
            let createdAt: Date | string | undefined = fixDate(item.createdAt);

            return (
              <tr key={item.documentId}>
                <td>{index + 1}</td>
                {showDetailedData() && <td>{item.documentId}</td>}
                {showDetailedData() && <td>{createdAt!.toString()}</td>}
                {showDetailedData() && <td>{item.projectName}</td>}
                <td>{item.comment}</td>
                <td>{item.imagesUrl!.length!}</td>
                {showDetailedData() && <td>{item.status}</td>}
                {!props.editable && (
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => props.onViewImagesDocument(item)}
                    >
                      Imagenes
                    </Button>
                  </td>
                )}
                {props.editable && (
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => props.onEditDocument(item)}
                    >
                      Editar
                    </Button>
                  </td>
                )}
                {props.editable && (
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => props.onDeleteDocument(item)}
                    >
                      Eliminar
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
