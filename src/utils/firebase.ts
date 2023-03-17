// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwF62TD_tkKMkjHQFi-acXAz-XzM35Fuc",
  authDomain: "netflix-clone-ee160.firebaseapp.com",
  projectId: "netflix-clone-ee160",
  storageBucket: "netflix-clone-ee160.appspot.com",
  messagingSenderId: "553359452628",
  appId: "1:553359452628:web:93b71f25f4b5eca40a0e41",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
