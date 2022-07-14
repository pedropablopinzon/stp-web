import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { addDocument, fetchProjects, updateDocument, fetchLogsByUser } from '../modules/db';
import { ILogCheckInOut } from '../interfaces/logCheckInOut.interface';
import { IProject } from '../interfaces/project.interface';
import { sortItemsString, showDetailedData } from '../modules/utils';
import { Collections } from '../enums/collections';

export const CheckInOut = () => {
  const collectionName = Collections.logCheckInOut;
  const history = useHistory();
  const { currentUser } = useAuth();
  const workingBusinessId: string = localStorage.getItem('workingBusinessId') || '';
  const workingBusinessName: string = localStorage.getItem('workingBusinessName') || '';
  const workingProjectId: string = localStorage.getItem('workingProjectId') || '';

  const [projects, setProjects] = useState<IProject[]>([]);
  const [logs, setLogs] = useState<ILogCheckInOut[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('selectProject');

  useEffect(() => {
    if (workingBusinessId.length > 0) {
      fetchProjects(workingBusinessId).then((data) => {
        sortItemsString(data, 'name');
        setProjects(data);
        if (workingProjectId.length > 0) {
          setSelectedProjectId(workingProjectId);
        }
      });
    }
  }, []);

  const checkIn = async () => {
    const data: ILogCheckInOut = {
      // @ts-ignore
      projectId: selectedProject.documentId,
      // @ts-ignore
      projectName: selectedProject.name,
      userId: currentUser.uid,
      checkOut: false,
      email: currentUser.email,
      userName: currentUser.displayName,
      businessId: workingBusinessId,
      businessName: workingBusinessName,
      createdAt: new Date(),
      createdBy: currentUser.uid,
      createdByEmail: currentUser.email,
      checkInAt: new Date(),
    };

    const result = await addDocument(collectionName, data);

    localStorage.setItem('workingLogCheckInOutId', result.id);
    // @ts-ignore
    localStorage.setItem('workingProjectId', data.projectId);
    // @ts-ignore
    localStorage.setItem('workingProjectName', data.projectName);
    // @ts-ignore
    localStorage.setItem('workingProjectCheckInAt', data.checkInAt);

    // @ts-ignore
    fetchLogsByUser(selectedProject.documentId, currentUser.uid).then((data) => setLogs(data));
  };

  const checkOut = async () => {
    const data: ILogCheckInOut = {
      checkOut: true,
      updatedAt: new Date(),
      updatedBy: currentUser.uid,
      updatedByEmail: currentUser.email,
      checkOutAt: new Date(),
    };

    // @ts-ignore
    await updateDocument(collectionName, logs[0].documentId, data);

    localStorage.setItem('workingProjectId', '');
    localStorage.setItem('workingProjectName', '');

    history.push('/home');
  };

  const handleProjectChange = (e: any) => {
    const project = projects.filter((element) => element.documentId === e.target.value);
    setSelectedProject(project[0]);

    setSelectedProjectId(e.target.value);
  };

  useEffect(() => {
    if (selectedProjectId.length > 0) {
      // @ts-ignore
      fetchLogsByUser(selectedProjectId, currentUser.uid).then((data) => {
        setLogs(data);
        if (data.length > 0) {
          if (workingProjectId.length === 0) {
            // @ts-ignore
            localStorage.setItem('workingLogCheckInOutId', data[0].documentId);
            // @ts-ignore
            localStorage.setItem('workingProjectId', data[0].projectId);
            // @ts-ignore
            localStorage.setItem('workingProjectName', data[0].projectName);
            // @ts-ignore
            localStorage.setItem('workingProjectCheckInAt', data[0].checkInAt);
          }
        }
      });
    }
  }, [selectedProjectId]);

  return (
    <>
      <Card>
        <Card.Body>
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      </Card>
      <select className="dropdown-toggle btn btn-info" onChange={handleProjectChange} value={selectedProjectId}>
        <option value="selectProject"> -- Seleccione un Proyecto -- </option>
        {projects.map((project: IProject) => (
          // @ts-ignore
          <option value={project.documentId} key={project.documentId}>
            {project.name}
          </option>
        ))}
      </select>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {showDetailedData() && <th>#</th>}
            {showDetailedData() && <th>Email</th>}
            <th>Check In</th>
            {showDetailedData() && <th>Check Out</th>}
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
                {showDetailedData() && <td>{log.documentId}</td>}
                {showDetailedData() && <td>{log.email}</td>}
                <td>{checkInAt!.toString()}</td>
                {showDetailedData() && <td>{checkOutAt!.toString()}</td>}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Button variant="success" onClick={checkIn} disabled={logs.length !== 0 || !selectedProject || workingProjectId.length !== 0}>
        Check In
      </Button>
      <Button variant="danger" onClick={checkOut} disabled={logs.length === 0}>
        Check Out
      </Button>
    </>
  );
};
