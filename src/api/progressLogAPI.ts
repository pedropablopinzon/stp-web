import { IProgressLog } from '../interfaces/ProgressLog.interface';
import * as service from './stpAPI/stpFirestoreAPI/ProgressLog';

export const createProgressLogAPI = (currentUser: any, data: IProgressLog) => {
  return service.createProgressLog(currentUser, data);
};

export const updateProgressLogAPI = (currentUser: any, documentId: string, data: IProgressLog) => {
  return service.updateProgressLog(currentUser, documentId, data);
};

export const deleteProgressLogAPI = (currentUser: any, documentId: string) => {
  return service.deleteProgressLog(currentUser, documentId);
};

export const readProgressLogAPI = (currentUser: any, documentId: string) => {
  return service.readProgressLog(currentUser, documentId);
};

export const getProgressLogAPI = (documentId: string) => {
  return service.getProgressLog(documentId);
};