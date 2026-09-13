import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDe6nzPS8Vvsb6X_g5zzQtCBjSYdrbPlpM",
  authDomain: "chatapplication-8c65a.firebaseapp.com",
  projectId: "chatapplication-8c65a",
  storageBucket: "chatapplication-8c65a.firebasestorage.app",
  messagingSenderId: "419724992199",
  appId: "1:419724992199:web:5e0ee1807ab8a99dd368e2",
  measurementId: "G-0H4DSDPRQT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
