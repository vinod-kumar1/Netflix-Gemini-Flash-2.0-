import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "./firebaseAuth";

// initializeApp(firebaseConfig);
initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});
let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let isValidPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const auth = getAuth();

export function signInuser(email, password) {
  if (!isValidEmail.test(email))
    return { status: false, message: "Invalid email. " };
  if (!isValidPassword.test(password))
    return {
      status: false,
      message: "Password length should be greater than 8.",
    };

  return (
    isValidEmail.test(email) &&
    isValidPassword.test(password) &&
    signInWithEmailAndPassword(auth, email, password)
  );
}

export async function signUp({ email, password, username, confirmPassword }) {
  if (!isValidEmail.test(email)) return "Invalid email";
  if (!isValidPassword.test(password))
    return "Invalid Password. Please try again";
  if (password !== confirmPassword)
    return "Password and Confirm password are not same";

  return createUserWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth)
    .then(() => true)
    .catch((err) => err);
}
export { auth };
