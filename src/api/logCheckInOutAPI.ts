import { ILogCheckInOut } from '../interfaces/logCheckInOut.interface';
import * as service from './stpAPI/stpFirestoreAPI/logCheckInOut';

export const createLogCheckInOutAPI = (currentUser: any, data: ILogCheckInOut) => {
  return service.createLogCheckInOut(currentUser, data);
};

export const updateLogCheckInOutAPI = (currentUser: any, documentId: string, data: ILogCheckInOut) => {
  return service.updateLogCheckInOut(currentUser, documentId, data);
};

export const deleteLogCheckInOutAPI = (currentUser: any, documentId: string) => {
  return service.deleteLogCheckInOut(currentUser, documentId);
};

export const readLogCheckInOutAPI = (currentUser: any, documentId: string) => {
  return service.readLogCheckInOut(currentUser, documentId);
};

export const getLogsByUserAPI = (projectId: string, userId: string) => {
  return service.getLogsByUser(projectId, userId);
};

export const getLogsByProjectAPI = (projectId: string) => {
  return service.getLogsByProject(projectId);
};
