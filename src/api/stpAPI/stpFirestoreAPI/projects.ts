import { firestoreDb } from '../../../Firebase';
import { addDocument, deleteDocument, readDocument, updateDocument } from '../UtilsDb';
import { Collections } from '../../../enums/Collections';
import { IProject } from '../../../interfaces/Project.interface';

export const createProject = async (currentUser: any, newData: IProject) => {
  const result = await addDocument(Collections.projects, newData);
  newData.documentId = result.id;

  return newData;
};

export const updateProject = async (currentUser: any, documentId: string, updateData: IProject) => {
  return updateDocument(Collections.projects, documentId, updateData);
};

export const deleteProject = async (currentUser: any, documentId: string) => {
  return deleteDocument(Collections.projects, documentId);
};

export const readProject = async (currentUser: any, documentId: string) => {
  return readDocument(Collections.projects, documentId);
};

export const getProjects = async (businessId: string) => {
  const querySnapshot = await firestoreDb
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
