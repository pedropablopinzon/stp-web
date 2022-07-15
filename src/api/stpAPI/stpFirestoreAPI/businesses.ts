import { deleteDocument, getDocumentReference, readDocument, setDocument, updateDocument } from '../UtilsDb';
import { Collections } from '../../../enums/Collections';
import { IBusiness } from '../../../interfaces/Business.interface';
import { IBusinessUser } from '../../../interfaces/BusinessUser.interface';
import { firestoreDb } from '../../../firebase';
import { addBusinessUser } from './BusinessUsers';

export const createBusiness = async (currentUser: any, newBusinessData: IBusiness) => {
  const docRef = await getDocumentReference(Collections.businesses);
  newBusinessData.businessId = docRef.id;

  const resultBusiness = await setDocument(docRef, newBusinessData);

  const resultBusinessUser = await addBusinessUser(currentUser, newBusinessData.businessId, 'OWNER');

  newBusinessData.documentId = docRef.id;

  return newBusinessData;
};

export const updateBusiness = async (currentUser: any, documentId: string, updateData: IBusiness) => {
  return updateDocument(Collections.businesses, documentId, updateData);
};

export const deleteBusiness = async (currentUser: any, documentId: string) => {
  return deleteDocument(Collections.businesses, documentId);
};

export const readBusiness = async (currentUser: any, businessId: string) => {
  return readDocument(Collections.businesses, businessId);
};

export const getBusinessesByBusinessessByUser = async (businessesByUser: IBusinessUser[]) => {
  const querySnapshot = await firestoreDb
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
