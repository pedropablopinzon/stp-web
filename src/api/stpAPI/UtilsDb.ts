import { doc, getDoc } from 'firebase/firestore';

import { firestoreDb } from '../../firebase';

export const getDocumentReference = async (collectionName: string) => {
  return await firestoreDb.collection(collectionName).doc();
};

export const setDocument = async (documentReference: any, data: any) => {
  return await documentReference.set(data);
};

export const addDocument = async (collectionName: string, data: any) => {
  return await firestoreDb.collection(collectionName).add(data);
};

export const updateDocument = async (collectionName: string, documentId: string, data: any) => {
  await firestoreDb.collection(collectionName).doc(documentId).update(data);
};

export const deleteDocument = async (collectionName: string, documentId: string) => {
  await firestoreDb.collection(collectionName).doc(documentId).delete();
};

export const readDocument = async (collectionName: string, documentId: string) => {
  const docRef = doc(firestoreDb, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const document = { ...docSnap.data(), documentId: docSnap.ref.id };
    return document;
  } else {
    console.error('No such document!');
    return null;
  }
};

export const fetchDocuments = async (collectionName: string) => {
  const querySnapshot = await firestoreDb.collection(collectionName).where('status', '==', 'ACTIVE').get();

  const documents: any[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.ref.id });
  });
  return documents;
};
