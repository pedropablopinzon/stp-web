import { firestoreDb } from '../../../Firebase';
import { addDocument, deleteDocument, readDocument, updateDocument } from '../UtilsDb';
import { IBusinessUser } from '../../../interfaces/BusinessUser.interface';
import { Collections } from '../../../enums/Collections';
import { Rol } from '../../../types/Rol.types';

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

export const addBusinessUser = async (currentUser: any, businessId: string, rolId: Rol) => {
  const newBusinessUserData: IBusinessUser = {
    businessId: businessId,
    userId: currentUser.uid,
    userName: currentUser.displayName,
    email: currentUser.email,
    rolId,
    status: 'ACTIVE',
    createdAt: new Date(),
    createdBy: currentUser.uid,
    createdByEmail: currentUser.email,
  };

  const resultBusinessUser = await addDocument(Collections.businessUsers, newBusinessUserData);
  newBusinessUserData.documentId = resultBusinessUser.id;

  return newBusinessUserData;
};

export const getBusinessesByUserAdministrativeRoles = async (userId: string) => {
  const roles: Rol[] = ['OWNER', 'EDITOR'];
  const querySnapshot = await firestoreDb
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
