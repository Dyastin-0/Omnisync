import { auth } from "./firebase";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logOut = () => {
  return signOut(auth);
};