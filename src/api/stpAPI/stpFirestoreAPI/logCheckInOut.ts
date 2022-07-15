import { firestoreDb } from '../../../firebase';
import { addDocument, deleteDocument, readDocument, updateDocument } from '../db';
import { Collections } from '../../../enums/collections';
import { ILogCheckInOut } from '../../../interfaces/logCheckInOut.interface';
import { fixDate } from '../../../common/utils';

export const createLogCheckInOut = async (currentUser: any, newData: ILogCheckInOut) => {
  const result = await addDocument(Collections.logCheckInOut, newData);
  newData.documentId = result.id;

  return newData;
};

export const updateLogCheckInOut = async (currentUser: any, documentId: string, updateData: ILogCheckInOut) => {
  return updateDocument(Collections.logCheckInOut, documentId, updateData);
};

export const deleteLogCheckInOut = async (currentUser: any, documentId: string) => {
  return deleteDocument(Collections.logCheckInOut, documentId);
};

export const readLogCheckInOut = async (currentUser: any, documentId: string) => {
  return readDocument(Collections.logCheckInOut, documentId);
};

export const getLogsByUser = async (projectId: string, userId: string) => {
  const querySnapshot = await firestoreDb
    .collection(Collections.logCheckInOut)
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

export const getLogsByProject = async (projectId: string) => {
  const querySnapshot = await firestoreDb.collection(Collections.logCheckInOut).where('projectId', '==', projectId).get();

  const logs: ILogCheckInOut[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.checkInAt = fixDate(data.checkInAt);
    data.checkOutAt = fixDate(data.checkOutAt);
    logs.push({ ...data, documentId: doc.ref.id });
  });
  return logs;
};