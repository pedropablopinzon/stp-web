import { IBusinessUser } from '../interfaces/businessUser.interface';
import * as service from './stpAPI/stpFirestoreAPI/businessUsers';

export const createBusinessUserAPI = (currentUser: any, data: IBusinessUser) => {
  return service.createBusinessUser(currentUser, data);
};

export const updateBusinessUserAPI = (currentUser: any, documentId: string, data: IBusinessUser) => {
  return service.updateBusinessUser(currentUser, documentId, data);
};

export const deleteBusinessUserAPI = (currentUser: any, documentId: string) => {
  return service.deleteBusinessUser(currentUser, documentId);
};

export const readBusinessUserAPI = (currentUser: any, documentId: string) => {
  return service.readBusinessUser(currentUser, documentId);
};

export const getBusinessUsersAPI = (documentId: string) => {
  return service.getBusinessUsers(documentId);
};

export const getBusinessesByUserAPI = (documentId: string) => {
  return service.getBusinessesByUser(documentId);
};

export const getBusinessesByUserAdministrativeRolesAPI = (userId: string) => {
  return service.getBusinessesByUserAdministrativeRoles(userId);
};
