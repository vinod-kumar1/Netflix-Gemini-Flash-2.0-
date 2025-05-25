import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseAuth";

initializeApp(firebaseConfig);
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
      .then((userDetails) => {
        console.log(userDetails);
        return { status: true, message: "Signed-in successfully" };
      })
      .catch((err) => ({ status: false, message: err.message }))
  );
}

export async function signUp({ username, email, password, confirmPassword }) {
  console.log(email, password);
  if (!isValidEmail.test(email))
    return { status: false, message: "Invalid email" };
  if (!isValidPassword.test(password))
    return { status: false, message: "Invalid Password. Please try again" };
  if (password !== confirmPassword)
    return {
      status: false,
      message: "Password and Confirm password are not same",
    };

  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      return {
        status: true,
        message: `${username} is signed up succesfully!`,
        token: res.user.accessToken,
      };
    })
    .catch((error) => {
      console.log(error.message);
      return { status: false, message: error.message };
    });
}

export function signOutUser() {}
