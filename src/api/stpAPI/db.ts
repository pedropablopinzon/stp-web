import { doc, getDoc } from 'firebase/firestore';

import { Collections } from '../../enums/collections';
import { firestoreDb } from '../../firebase';
import { IBusinessUser } from '../../interfaces/businessUser.interface';
import { IInvitation } from '../../interfaces/invitation.interface';
import { ILogCheckInOut } from '../../interfaces/logCheckInOut.interface';
import { IResult } from '../../interfaces/result.interface';
import { Rol } from '../../types/rol.types';
import { fixDate } from '../../common/utils';
import { addBusinessUser } from './stpFirestoreAPI/businessUsers';

export const getDocumentReference = async (collectionName: string) => {
  return await firestoreDb.collection(collectionName).doc();
};

export const setDocument = async (documentReference: any, data: any) => {
  return await documentReference.set(data);
};

export const addDocument = async (collectionName: string, data: any) => {
  return await firestoreDb.collection(collectionName).add(data);
};

export const updateDocument = async (collectionName: string, documentId: string, data: any) => {
  await firestoreDb.collection(collectionName).doc(documentId).update(data);
};

export const deleteDocument = async (collectionName: string, documentId: string) => {
  await firestoreDb.collection(collectionName).doc(documentId).delete();
};

export const readDocument = async (collectionName: string, documentId: string) => {
  const docRef = doc(firestoreDb, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const document = { ...docSnap.data(), documentId: docSnap.ref.id };
    return document;
  } else {
    console.error('No such document!');
    return null;
  }
};

export const fetchDocuments = async (collectionName: string) => {
  const querySnapshot = await firestoreDb.collection(collectionName).where('status', '==', 'ACTIVE').get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};

export const fetchBusinessUsersByEmail = async (businessId: string, email: string) => {
  const querySnapshot = await firestoreDb
    .collection(Collections.businessUsers)
    .where('status', '==', 'ACTIVE')
    .where('businessId', '==', businessId)
    .where('email', '==', email)
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};

export const fetchInvitationsByBusinessAndEmail = async (businessId: string, email: string) => {
  const querySnapshot = await firestoreDb
    .collection(Collections.invitations)
    .where('status', '==', 'ACTIVE')
    .where('businessId', '==', businessId)
    .where('email', '==', email)
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};

export const fetchInvitationsByEmail = async (email: string) => {
  const querySnapshot = await firestoreDb
    .collection(Collections.invitations)
    .where('status', '==', 'ACTIVE')
    .where('email', '==', email)
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};

export const deleteInvitations = async (businessId: string, email: string) => {
  const invitations: any[] = await fetchInvitationsByBusinessAndEmail(businessId, email);
  invitations.forEach(async (element) => {
    await deleteDocument(Collections.invitations, element.documentId);
  });
};

export const addInvitation = async (
  currentUser: any,
  email: string,
  rolId: Rol,
  businessId: string,
  businessName: string
): Promise<IResult> => {
  const result: IResult = {
    status: true,
    message: 'Invitation generated',
    show: true,
    variant: 'Primary',
    title: 'Invitacion',
    subtitle: '',
  };

  if (email.length === 0) {
    result.status = false;
    result.message = `Enter an Email`;
    result.variant = 'Warning';
    return result;
  }

  const businessUsers: any[] = await fetchBusinessUsersByEmail(businessId, email);

  if (businessUsers.length > 0) {
    result.status = false;
    result.message = `The email (${email}) is already assigned to the business`;
    result.variant = 'Warning';
    return result;
  }

  await deleteInvitations(businessId, email);

  const invitation: IInvitation = {
    businessId,
    businessName,
    email,
    rolId,
    status: 'ACTIVE',
    createdAt: new Date(),
    createdAtNumber: new Date().getTime(),
    createdBy: currentUser.uid,
    createdByEmail: currentUser.email,
  };

  const resultInvitation = await addDocument(Collections.invitations, invitation);
  result.collectionName = Collections.invitations;
  result.documentId = resultInvitation.id;

  return result;
};

export const rejectInvitation = async (currentUser: any, documentId: string) => {
  const updateData: IInvitation = {
    status: 'REJECTED',
    updatedAt: new Date(),
    updatedBy: currentUser.uid,
    updatedByEmail: currentUser.email,
  };

  return await updateDocument(Collections.invitations, documentId, updateData);
};

export const acceptInvitation = async (currentUser: any, documentId: string, businessId: string, rolId: Rol) => {
  const resultBusinessUser = await addBusinessUser(currentUser, businessId, rolId);

  const updateData: IInvitation = {
    status: 'ACCEPTED',
    updatedAt: new Date(),
    updatedBy: currentUser.uid,
    updatedByEmail: currentUser.email,
  };

  await updateDocument(Collections.invitations, documentId, updateData);

  return resultBusinessUser;
};

export const fetchExpenseRecord = async (projectId: string) => {
  const querySnapshot = await firestoreDb
    .collection(Collections.expenseRecord)
    .where('status', '==', 'ACTIVE')
    .where('projectId', '==', projectId)
    .get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (!data.imagesUrl) {
      data.imagesUrl = [];
    }
    documents.push({ ...data, documentId: doc.ref.id });
  });
  return documents;
};

