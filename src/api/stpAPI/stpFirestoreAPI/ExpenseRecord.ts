import { Collections } from '../../../enums/Collections';
import { IExpenseRecord } from '../../../interfaces/ExpenseRecord.interface';
import { addDocument, deleteDocument, readDocument, updateDocument } from '../UtilsDb';

export const createExpenseRecord = async (currentUser: any, newData: IExpenseRecord) => {
  const result = await addDocument(Collections.expenseRecord, newData);
  newData.documentId = result.id;

  return newData;
};

export const updateExpenseRecord = async (currentUser: any, documentId: string, updateData: IExpenseRecord) => {
  return updateDocument(Collections.expenseRecord, documentId, updateData);
};

export const deleteExpenseRecord = async (currentUser: any, documentId: string) => {
  return deleteDocument(Collections.expenseRecord, documentId);
};

export const readExpenseRecord = async (currentUser: any, documentId: string) => {
  return readDocument(Collections.businesses, documentId);
};
