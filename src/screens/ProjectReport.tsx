import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ExpenseRecordTable } from "../components/tables/ExpenseRecord.table";

import { ProgressLogTable } from "../components/tables/ProgressLog.table";
import { IExpenseRecord } from "../interfaces/expenseRecord.interface";
import { IProgressLog } from "../interfaces/progressLog.interface";
import { fetchExpenseRecord, fetchProgressLog } from "../modules/db";
import { sortItems } from "../modules/utils";

export const ProjectReport = () => {
  // @ts-ignore
  const { projectId } = useParams();

  const [progressLog, setProgressLog] = useState<IProgressLog[]>([]);
  const [expenseRecord, setExpenseRecord] = useState<IExpenseRecord[]>([]);

  useEffect(() => {
    fetchProgressLog(projectId).then((data) => {
      sortItems(data, "createdAtNumber", "desc");
      setProgressLog(data);
    });

    fetchExpenseRecord(projectId).then((data) => {
      sortItems(data, "createdAtNumber", "desc");
      setExpenseRecord(data);
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
          abc
        </Tab>
        <Tab eventKey="progressLog" title="Progreso">
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
        <Tab eventKey="contact" title="Info">
          xyz
        </Tab>
      </Tabs>
    </>
  );
};
