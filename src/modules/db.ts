import { db } from '../firebase';

export const addDocument = async (collectionName: string, document: any) => {
  return await db.collection(collectionName).add(document);
};

export const updateDocument = async (collectionName: string, documentId: string, document: any) => {
  await db.collection(collectionName).doc(documentId).update(document);
};

export const deleteDocument = async (collectionName: string, documentId: string) => {
  await db.collection(collectionName).doc(documentId).delete();
};

export const fetchDocuments = async (collectionName: string) => {
  const querySnapshot = await db.collection(collectionName).where('status', '==', 'ACTIVE').get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};
