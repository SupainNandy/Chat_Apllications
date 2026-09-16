import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const rawAuthDomain = import.meta.env.FIREBASE_AUTH_DOMAIN || "chatapplication-8c65a.firebaseapp.com";
const authDomain = rawAuthDomain.includes("firebaseapp.com")
  ? rawAuthDomain.split("firebaseapp.com")[0] + "firebaseapp.com"
  : rawAuthDomain;

const rawStorageBucket = import.meta.env.FIREBASE_STORAGE_BUCKET || "chatapplication-8c65a.firebasestorage.app";
const storageBucket = rawStorageBucket.includes("firebasestorage.app")
  ? rawStorageBucket.split("firebasestorage.app")[0] + "firebasestorage.app"
  : rawStorageBucket;

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY || "AIzaSyDe6nzPS8Vvsb6X_g5zzQtCBjSYdrbPlpM",
  authDomain,
  projectId: import.meta.env.FIREBASE_PROJECT_ID || "chatapplication-8c65a",
  storageBucket,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID || "419724992199",
  appId: import.meta.env.FIREBASE_APP_ID || "1:419724992199:web:5e0ee1807ab8a99dd368e2",
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID || "G-0H4DSDPRQT",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
