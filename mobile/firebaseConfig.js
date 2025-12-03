import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBFWbPdnEZivYGiteY4j8buh_w4GY9SKXA",
    authDomain: "london-2-20028.firebaseapp.com",
    projectId: "london-2-20028",
    storageBucket: "london-2-20028.firebasestorage.app",
    messagingSenderId: "968181589884",
    appId: "1:968181589884:web:84500d668c30f8eab0e6f9",
    measurementId: "G-EGNHYJZSRD"
};

// Initialize Firebase
let app;
let auth;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    // Initialize Auth with persistence
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
} else {
    app = getApp();
    auth = getAuth(app);
}

export const db = getFirestore(app);
export const storage = getStorage(app);
export { auth };
export default app;
