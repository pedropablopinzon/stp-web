import { db } from '../firebase';

export const addDocument = async (collectionName, document) => {
  return await db.collection(collectionName).add(document);
};

export const updateDocument = async (collectionName, documentId, document) => {
  await db.collection(collectionName).doc(documentId).update(document);
};

export const deleteDocument = async (collectionName, documentId) => {
  await db.collection(collectionName).doc(documentId).delete();
};

export const fetchDocuments = async (collectionName) => {
  const querySnapshot = await db.collection(collectionName).where('status', '==', 'ACTIVE').get();

  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};