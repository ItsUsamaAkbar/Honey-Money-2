import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKBT3BqZapvmL_3-M9uGpIdWW59ZvjIKE",
  authDomain: "testing-5ad48.firebaseapp.com",
  projectId: "testing-5ad48",
  storageBucket: "testing-5ad48.appspot.com",
  messagingSenderId: "266804275118",
  appId: "1:266804275118:web:8778f62661ade47b740a3f",
};
export const fireapp = initializeApp(firebaseConfig);
export const auth = getAuth(fireapp);
export const db = getFirestore(fireapp);
