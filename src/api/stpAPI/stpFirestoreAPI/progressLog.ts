import { firestoreDb } from '../../../firebase';
import { addDocument, deleteDocument, readDocument, updateDocument } from '../db';
import { Collections } from '../../../enums/collections';
import { IProgressLog } from '../../../interfaces/progressLog.interface';

export const createProgressLog = async (currentUser: any, newData: IProgressLog) => {
  const result = await addDocument(Collections.progressLog, newData);
  newData.documentId = result.id;

  return newData;
};

export const updateProgressLog = async (currentUser: any, documentId: string, updateData: IProgressLog) => {
  return updateDocument(Collections.progressLog, documentId, updateData);
};

export const deleteProgressLog = async (currentUser: any, documentId: string) => {
  return deleteDocument(Collections.progressLog, documentId);
};

export const readProgressLog = async (currentUser: any, documentId: string) => {
  return readDocument(Collections.progressLog, documentId);
};

export const getProgressLog = async (projectId: string) => {
  const querySnapshot = await firestoreDb
    .collection(Collections.progressLog)
    .where('status', '==', 'ACTIVE')
    .where('projectId', '==', projectId)
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};
