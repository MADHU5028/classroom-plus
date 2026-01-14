import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const loginWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider);
};

export const logout = async () => {
  await signOut(auth);
};
