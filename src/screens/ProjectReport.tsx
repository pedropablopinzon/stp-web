import React, { useEffect, useState } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ExpenseRecordTable } from "../components/tables/ExpenseRecord.table";

import { ProgressLogTable } from "../components/tables/ProgressLog.table";
import { IExpenseRecord } from "../interfaces/expenseRecord.interface";
import { ILogCheckInOut } from "../interfaces/logCheckInOut.interface";
import { IProgressLog } from "../interfaces/progressLog.interface";
import { fetchExpenseRecord, fetchLogs, fetchProgressLog } from "../modules/db";
import { sortItems } from "../modules/utils";

export const ProjectReport = () => {
  // @ts-ignore
  const { projectId } = useParams();

  const [progressLog, setProgressLog] = useState<IProgressLog[]>([]);
  const [expenseRecord, setExpenseRecord] = useState<IExpenseRecord[]>([]);
  const [logs, setLogs] = useState<ILogCheckInOut[]>([]);

  useEffect(() => {
    fetchProgressLog(projectId).then((data) => {
      sortItems(data, "createdAtNumber", "desc");
      setProgressLog(data);
    });

    fetchExpenseRecord(projectId).then((data) => {
      sortItems(data, "createdAtNumber", "desc");
      setExpenseRecord(data);
    });

    fetchLogs(projectId).then((data) => {
      sortItems(data, "createdAtNumber", "desc");
      setLogs(data);
    });
  }, []);

  return (
    <>
      <h1>Project - Report {projectId}</h1>
      <Tabs
        defaultActiveKey="checkInOut"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="checkInOut" title="Marcado">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>EMail</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log: ILogCheckInOut, index) => {
                const checkInAt = log.checkInAt;
                let checkOutAt: Date | string | undefined = log.checkOutAt;
                if (!checkOutAt) {
                  checkOutAt = "";
                }
                return (
                  <tr key={log.documentId}>
                    <td>{index + 1}</td>
                    <td>{checkInAt!.toString()}</td>
                    <td>{checkOutAt!.toString()}</td>
                    <td>{log.email}</td>
                    <td>{log.userName}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="progressLog" title="Tareas">
          <ProgressLogTable
            items={progressLog}
            onEditDocument={() => {}}
            onDeleteDocument={() => {}}
            editable={false}
          />
        </Tab>
        <Tab eventKey="expenseRecord" title="Gastos">
          <ExpenseRecordTable
            items={expenseRecord}
            onEditDocument={() => {}}
            onDeleteDocument={() => {}}
            editable={false}
          />
        </Tab>
        <Tab eventKey="contact" title="Info"></Tab>
      </Tabs>
    </>
  );
};
