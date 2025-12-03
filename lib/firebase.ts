import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFWbPdnEZivYGiteY4j8buh_w4GY9SKXA",
  authDomain: "london-2-20028.firebaseapp.com",
  projectId: "london-2-20028",
  storageBucket: "london-2-20028.firebasestorage.app",
  messagingSenderId: "968181589884",
  appId: "1:968181589884:web:84500d668c30f8eab0e6f9",
  measurementId: "G-EGNHYJZSRD"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
