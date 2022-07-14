import { firestoreDb } from '../../../firebase';
import { Collections } from '../../../enums/collections';
import { Rol } from '../../../types/rol.types';

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
