
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAWaDUdwv2noWMwc9dRdaN5_VDIoH__-rI",
  authDomain: "classroom-plus-3af5d.firebaseapp.com",
  projectId: "classroom-plus-3af5d",
  storageBucket: "classroom-plus-3af5d.firebasestorage.app",
  messagingSenderId: "788603181066",
  appId: "1:788603181066:web:873416e0f7dfbc118ce7f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();