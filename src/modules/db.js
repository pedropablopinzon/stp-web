import { db } from '../firebase';

export const addDocument = async (collectionName, document) => {
  //   db.collection(collectionName)
  //     .add(document)
  //     .then((docRef) => {
  //       console.log('Document written with ID: ', docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error('Error adding document: ', error);
  //     });
  return await db.collection(collectionName).add(document);
};

export const updateDocument = async (collectionName, documentId, document) => {
  await db.collection(collectionName).doc(documentId).update(document);
};

export const deleteDocument = async (collectionName, documentId) => {
  await db.collection(collectionName).doc(documentId).delete();
};
