import * as service from './stpAPI/stpFirestoreAPI/user';

export const getBusinessesByUserAdministrativeRolesAPI = (userId: string) => {
  return service.getBusinessesByUserAdministrativeRoles(userId);
};
