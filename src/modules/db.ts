import { Collections } from '../enums/collections';
import { db } from '../firebase';
import { IBusinessUser } from '../interfaces/businessUser.interface';
import { Rol } from '../types/rol.types';

export const getDocumentReference = async (collectionName: string) => {
  return await db.collection(collectionName).doc();
};

export const setDocument = async (documentReference: any, data: any) => {
  return await documentReference.set(data);
};

export const addDocument = async (collectionName: string, data: any) => {
  return await db.collection(collectionName).add(data);
};

export const updateDocument = async (collectionName: string, documentId: string, data: any) => {
  await db
    .collection(collectionName)
    .doc(documentId)
    .update(data);
};

export const deleteDocument = async (collectionName: string, documentId: string) => {
  await db
    .collection(collectionName)
    .doc(documentId)
    .delete();
};

export const fetchDocuments = async (collectionName: string) => {
  const querySnapshot = await db
    .collection(collectionName)
    .where('status', '==', 'ACTIVE')
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};

export const getBusinessesByUser = async (userId: string) => {
  const querySnapshot = await db
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

export const getBusinessesByUserAndRol = async (userId: string) => {
  const roles: Rol[] = ['OWNER', 'EDITOR'];
  const querySnapshot = await db
    .collection(Collections.businessUsers)
    .where('userId', '==', userId)
    .where('status', '==', 'ACTIVE')
    .where('rolId', 'in', roles)
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc): any => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};

export const fetchBusinesses = async (businessesByUser: IBusinessUser[]) => {
  const querySnapshot = await db
    .collection(Collections.businesses)
    .where('status', '==', 'ACTIVE')
    .where(
      'businessId',
      'in',
      businessesByUser.map((element) => element.businessId)
    )
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};

export const fetchProjects = async (businessId: string) => {
  const querySnapshot = await db
    .collection(Collections.projects)
    .where('status', '==', 'ACTIVE')
    .where('businessId', '==', businessId)
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};
