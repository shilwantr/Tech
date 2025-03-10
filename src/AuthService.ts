import {  signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
    return signOut(auth);
};
