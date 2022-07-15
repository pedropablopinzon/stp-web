import { IProject } from '../interfaces/Project.interface';
import * as service from './stpAPI/stpFirestoreAPI/Projects';

export const createProjectAPI = (currentUser: any, data: IProject) => {
  return service.createProject(currentUser, data);
};

export const updateProjectAPI = (currentUser: any, documentId: string, data: IProject) => {
  return service.updateProject(currentUser, documentId, data);
};

export const deleteProjectAPI = (currentUser: any, documentId: string) => {
  return service.deleteProject(currentUser, documentId);
};

export const readProjectAPI = (currentUser: any, documentId: string) => {
  return service.readProject(currentUser, documentId);
};

export const getProjectsAPI = (documentId: string) => {
  return service.getProjects(documentId);
};
