import { IExpenseRecord } from '../interfaces/ExpenseRecord.interface';
import * as service from './stpAPI/stpFirestoreAPI/ExpenseRecord';

export const createExpenseRecordAPI = (currentUser: any, data: IExpenseRecord) => {
  return service.createExpenseRecord(currentUser, data);
};

export const updateExpenseRecordAPI = (currentUser: any, documentId: string, data: IExpenseRecord) => {
  return service.updateExpenseRecord(currentUser, documentId, data);
};

export const deleteExpenseRecordAPI = (currentUser: any, documentId: string) => {
  return service.deleteExpenseRecord(currentUser, documentId);
};

export const readExpenseRecordAPI = (currentUser: any, documentId: string) => {
  return service.readExpenseRecord(currentUser, documentId);
};

export const getExpenseRecordAPI = (projectId: string) => {
  return service.getExpenseRecord(projectId);
};
