import { IInvitation } from '../interfaces/Invitation.interface';
import { Rol } from '../types/Rol.types';
import * as service from './stpAPI/stpFirestoreAPI/Invitations';

export const createInvitationAPI = (currentUser: any, data: IInvitation) => {
  return service.createInvitation(currentUser, data);
};

export const updateInvitationAPI = (currentUser: any, documentId: string, data: IInvitation) => {
  return service.updateInvitation(currentUser, documentId, data);
};

export const deleteInvitationAPI = (currentUser: any, documentId: string) => {
  return service.deleteInvitation(currentUser, documentId);
};

export const readInvitationAPI = (currentUser: any, documentId: string) => {
  return service.readInvitation(currentUser, documentId);
};

export const getInvitationsByBusinessAndEmailAPI = (businessId: string, email: string) => {
  return service.getInvitationsByBusinessAndEmail(businessId, email);
};

export const getInvitationsByEmailAPI = (email: string) => {
  return service.getInvitationsByEmail(email);
};

export const addInvitationAPI = (currentUser: any, email: string, rolId: Rol, businessId: string, businessName: string) => {
  return service.addInvitation(currentUser, email, rolId, businessId, businessName);
};

export const rejectInvitationAPI = (currentUser: any, documentId: string) => {
  return service.rejectInvitation(currentUser, documentId);
};

export const acceptInvitationAPI = (currentUser: any, documentId: string, businessId: string, rolId: Rol) => {
  return service.acceptInvitation(currentUser, documentId, businessId, rolId);
};
