import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
console.log( firebaseConfig)
// const firebaseConfig = {
//   apiKey: "AIzaSyCm6jAOcIo72RURaVcXEA_psUsBBr0una8",
//   authDomain: "stp-dev-2dfb7.firebaseapp.com",
//   projectId: "stp-dev-2dfb7",
//   storageBucket: "stp-dev-2dfb7.appspot.com",
//   messagingSenderId: "698899803378",
//   appId: "1:698899803378:web:16d4047f0c22715b23746b",
//   measurementId: "G-Q3PMR8C20G"
// };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebaseApp;
