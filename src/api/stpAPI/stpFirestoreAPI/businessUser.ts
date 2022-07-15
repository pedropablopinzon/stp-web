import { firestoreDb } from '../../../firebase';
import { addDocument, deleteDocument, readDocument, updateDocument } from '../db';
import { IBusinessUser } from '../../../interfaces/businessUser.interface';
import { Collections } from '../../../enums/collections';

export const createBusinessUser = async (currentUser: any, newData: IBusinessUser) => {
  const result = await addDocument(Collections.businessUsers, newData);
  newData.documentId = result.id;

  return newData;
};

export const updateBusinessUser = async (currentUser: any, documentId: string, updateData: IBusinessUser) => {
  return updateDocument(Collections.businessUsers, documentId, updateData);
};

export const deleteBusinessUser = async (currentUser: any, documentId: string) => {
  return deleteDocument(Collections.businessUsers, documentId);
};

export const readBusinessUser = async (currentUser: any, documentId: string) => {
  return readDocument(Collections.businesses, documentId);
};

export const getBusinessUsers = async (businessId: string) => {
  const querySnapshot = await firestoreDb
    .collection(Collections.businessUsers)
    .where('status', '==', 'ACTIVE')
    .where('businessId', '==', businessId)
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};

export const getBusinessesByUser = async (userId: string) => {
  const querySnapshot = await firestoreDb
    .collection(Collections.businessUsers)
    .where('userId', '==', userId)
    .where('status', '==', 'ACTIVE')
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc): any => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};
