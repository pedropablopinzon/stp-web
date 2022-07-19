import { firestoreDb } from '../../../firebase';
import { addDocument, deleteDocument, readDocument, updateDocument } from '../UtilsDb';
import { Collections } from '../../../enums/Collections';
import { IInvitation } from '../../../interfaces/Invitation.interface';
import { addBusinessUser, getBusinessUsersByEmail } from './BusinessUsers';
import { Rol } from '../../../types/Rol.types';
import { IResult } from '../../../interfaces/Result.interface';

export const createInvitation = async (currentUser: any, newData: IInvitation) => {
  const result = await addDocument(Collections.invitations, newData);
  newData.documentId = result.id;

  return newData;
};

export const updateInvitation = async (currentUser: any, documentId: string, updateData: IInvitation) => {
  return updateDocument(Collections.invitations, documentId, updateData);
};

export const deleteInvitation = async (currentUser: any, documentId: string) => {
  return deleteDocument(Collections.invitations, documentId);
};

export const readInvitation = async (currentUser: any, documentId: string) => {
  return readDocument(Collections.invitations, documentId);
};

export const getInvitationsByBusinessAndEmail = async (businessId: string, email: string) => {
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

export const getInvitationsByEmail = async (email: string) => {
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
  const invitations: any[] = await getInvitationsByBusinessAndEmail(businessId, email);
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

  const businessUsers: any[] = await getBusinessUsersByEmail(businessId, email);

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