import React from "react";
import { Button, Table } from "react-bootstrap";

import { IProject } from "../../interfaces/Project.interface";
import { fixDate, showDetailedData } from "../../common/Utils";

export const ProjectsTable = (props: {
  items: IProject[];
  onEditDocument: Function;
  onDeleteDocument: Function;
  onReportDocument: Function;
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
            {showDetailedData() && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {props.items.map((item: IProject, index: number) => {
            let createdAt: Date | string | undefined = fixDate(item.createdAt);

            return (
              <tr key={item.documentId}>
                <td>{index + 1}</td>
                {showDetailedData() && <td>{item.documentId}</td>}
                {showDetailedData() && <td>{createdAt!.toString()}</td>}
                <td>{item.name}</td>
                {showDetailedData() && <td>{item.status}</td>}
                <td>
                  <Button
                    variant="primary"
                    onClick={() => props.onEditDocument(item)}
                  >
                    Editar
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => props.onDeleteDocument(item)}
                  >
                    Eliminar
                  </Button>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => props.onReportDocument(item)}
                  >
                    Reporte
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
