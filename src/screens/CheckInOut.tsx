import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { addDocument, updateDocument } from '../modules/db';
import { ILogCheckInOut } from '../interfaces/logCheckInOut.interface';
import { IProject } from '../interfaces/project.interface';
import { fixDate } from '../modules/utils';

export const CheckInOut = () => {
  const history = useHistory();
  const { currentUser } = useAuth();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [logs, setLogs] = useState<ILogCheckInOut[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  let workingProjectId = localStorage.getItem('workingProjectId');
  if (!workingProjectId) {
    workingProjectId = '';
  }

  const fetchProjects = async () => {
    const querySnapshot = await db
      .collection('projects')
      .where('status', '==', 'ACTIVE')
      .get();

    const projects: IProject[] = [];
    querySnapshot.forEach((doc) => {
      projects.push({ ...doc.data(), documentId: doc.ref.id });
    });
    return projects;
  };

  const fetchLogs = async (projectId: string, userId: string) => {
    const querySnapshot = await db
      .collection('logCheckInOut')
      .where('projectId', '==', projectId)
      .where('userId', '==', userId)
      .where('checkOut', '==', false)
      .get();

    const logs: ILogCheckInOut[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.checkInAt = fixDate(data.checkInAt);
      data.checkOutAt = fixDate(data.checkOutAt);
      logs.push({ ...data, documentId: doc.ref.id });
    });
    return logs;
  };

  useEffect(() => {
    fetchProjects().then((data) => setProjects(data));
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
      createdAt: new Date(),
      createdBy: currentUser.uid,
      checkInAt: new Date(),
    };

    const result = await addDocument('logCheckInOut', data);

    localStorage.setItem('workingLogCheckInOutId', result.id);
    // @ts-ignore
    localStorage.setItem('workingProjectId', data.projectId);
    // @ts-ignore
    localStorage.setItem('workingProjectName', data.projectName);
    // @ts-ignore
    localStorage.setItem('workingProjectCheckInAt', data.checkInAt);

    // @ts-ignore
    fetchLogs(selectedProject.documentId, currentUser.uid).then((data) => setLogs(data));
  };

  const checkOut = async () => {
    const data: ILogCheckInOut = {
      checkOut: true,
      updatedAt: new Date(),
      updatedBy: currentUser.uid,
      checkOutAt: new Date(),
    };

    // @ts-ignore
    await updateDocument('logCheckInOut', logs[0].documentId, data);

    localStorage.setItem('workingProjectId', '');
    localStorage.setItem('workingProjectName', '');

    history.push('/home');
  };

  const handleProjectChange = (e: any) => {
    const project = projects.filter((element) => element.documentId === e.target.value);
    setSelectedProject(project[0]);

    // @ts-ignore
    fetchLogs(project[0].documentId, currentUser.uid).then((data) => setLogs(data));
  };

  return (
    <>
      <Card>
        <Card.Body>
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      </Card>
      <select className="dropdown-toggle btn btn-info" onChange={handleProjectChange}>
        <option value="⬇️ Seleccione un Proyecto ⬇️"> -- Seleccione un Proyecto -- </option>
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
            <th>#</th>
            <th>Email</th>
            <th>Check In</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log: ILogCheckInOut) => {
            const checkInAt = log.checkInAt;
            let checkOutAt: Date | string | undefined = log.checkOutAt;
            if (!checkOutAt) {
              checkOutAt = '';
            }
            return (
              <tr key={log.documentId}>
                <td>{log.documentId}</td>
                <td>{log.email}</td>
                <td>{checkInAt!.toString()}</td>
                <td>{checkOutAt!.toString()}</td>
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
