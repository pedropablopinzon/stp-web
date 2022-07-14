import { IBusiness } from '../interfaces/business.interface';
import { IBusinessUser } from '../interfaces/businessUser.interface';
import * as service from './stpAPI/stpFirestoreAPI/business';

export const createBusinessAPI = (currentUser: any, data: IBusiness) => {
  return service.createBusiness(currentUser, data);
};

export const updateBusinessAPI = (currentUser: any, documentId: string, data: IBusiness) => {
  return service.updateBusiness(currentUser, documentId, data);
};

export const deleteBusinessAPI = (currentUser: any, documentId: string) => {
  return service.deleteBusiness(currentUser, documentId);
};

export const getBusinessesAPI = (businessesByUser: IBusinessUser[]) => {
  return service.getBusinesses(businessesByUser);
};
