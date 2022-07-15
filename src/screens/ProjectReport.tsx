import React, { useEffect, useRef, useState } from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ModalViewImages } from '../components/ModalViewImages';
import { ExpenseRecordTable } from '../components/tables/ExpenseRecord.table';

import { getProgressLogAPI } from '../api/progressLogAPI';
import { readProjectAPI } from '../api/projectsAPI';
import { getLogsByProjectAPI } from '../api/logCheckInOutAPI';
import { fetchExpenseRecord } from '../api/stpAPI/db';
import { useAuth } from '../contexts/AuthContext';
import { sortItems } from '../common/utils';
import { IExpenseRecord } from '../interfaces/expenseRecord.interface';
import { ILogCheckInOut } from '../interfaces/logCheckInOut.interface';
import { IProgressLog } from '../interfaces/progressLog.interface';
import { IProject } from '../interfaces/project.interface';
import { ProgressLogTable } from '../components/tables/ProgressLog.table';

export const ProjectReport = () => {
  // @ts-ignore
  const { projectId } = useParams();
  const { currentUser } = useAuth();

  const defaultProjectDocument: IProject = {
    documentId: null,
    name: '',
    businessId: '',
    businessName: '',
    status: 'ACTIVE',
  };
  const defaultProgressLogDocument: IProgressLog = {
    documentId: null,
    comment: '',
    imagesUrl: [],
    status: 'ACTIVE',
  };
  const defaultExpenseRecordDocument: IExpenseRecord = {
    documentId: null,
    amount: 0,
    comment: '',
    imagesUrl: [],
    status: 'ACTIVE',
  };

  const [selectedProject, setSelectedProject] = useState<IProject>(defaultProjectDocument);
  const [progressLog, setProgressLog] = useState<IProgressLog[]>([]);
  const [expenseRecord, setExpenseRecord] = useState<IExpenseRecord[]>([]);
  const [logs, setLogs] = useState<ILogCheckInOut[]>([]);
  const [selectedProgressLogDocument, setSelectedProgressLogDocument] = useState<IProgressLog>(defaultProgressLogDocument);
  const [selectedExpenseRecordDocument, setSelectedExpenseRecordDocument] = useState<IExpenseRecord>(defaultExpenseRecordDocument);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  useEffect(() => {
    readProjectAPI(currentUser, projectId).then((data: any) => {
      if (data) {
        setSelectedProject(data);
      }
    });

    getProgressLogAPI(projectId).then((data) => {
      sortItems(data, 'createdAtNumber', 'desc');
      setProgressLog(data);
    });

    fetchExpenseRecord(projectId).then((data) => {
      sortItems(data, 'createdAtNumber', 'desc');
      setExpenseRecord(data);
    });

    getLogsByProjectAPI(projectId).then((data) => {
      sortItems(data, 'createdAtNumber', 'desc');
      setLogs(data);
    });
  }, []);

  useEffect(() => {
    if (selectedProgressLogDocument.documentId) {
      setImagesUrl(selectedProgressLogDocument.imagesUrl!);
      // @ts-ignore
      childRefViewImages.current.show();
      setSelectedProgressLogDocument(defaultProgressLogDocument);
    }
  }, [selectedProgressLogDocument]);

  useEffect(() => {
    if (selectedExpenseRecordDocument.documentId) {
      setImagesUrl(selectedExpenseRecordDocument.imagesUrl!);
      // @ts-ignore
      childRefViewImages.current.show();
      setSelectedExpenseRecordDocument(defaultExpenseRecordDocument);
    }
  }, [selectedExpenseRecordDocument]);

  const childRefViewImages = useRef();

  return (
    <>
      <h1>Reporte - {selectedProject.name}</h1>
      <ModalViewImages
        ref={childRefViewImages}
        title={'Imagenes'}
        // @ts-ignore
        imagesUrl={imagesUrl}
      />
      <Tabs defaultActiveKey="checkInOut" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="checkInOut" title={`Marcado (${logs.length})`}>
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
                  checkOutAt = '';
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
        <Tab eventKey="progressLog" title={`Tareas (${progressLog.length})`}>
          <ProgressLogTable
            items={progressLog}
            onEditDocument={() => {}}
            onDeleteDocument={() => {}}
            onViewImagesDocument={setSelectedProgressLogDocument}
            editable={false}
          />
        </Tab>
        <Tab eventKey="expenseRecord" title={`Gastos (${expenseRecord.length})`}>
          <ExpenseRecordTable
            items={expenseRecord}
            onEditDocument={() => {}}
            onDeleteDocument={() => {}}
            onViewImagesDocument={setSelectedExpenseRecordDocument}
            editable={false}
          />
        </Tab>
      </Tabs>
    </>
  );
};
