import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseAuth";

initializeApp(firebaseConfig);
let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let isValidPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export function validateRegex(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  let message = "";
  //   let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  //   let isValidPassword =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
  //       password
  //     );
  if (isValidEmail.test(email) && isValidPassword.test(password)) return true;
  if (!isValidEmail.test(email)) message += "Invalid email. ";
  if (!isValidPassword.test(password))
    message += "Password length should be greater than 8.";
  return message;
}

export function signUp({ username, email, password, confirmPassword }) {
  if (!isValidEmail.test(email))
    return { status: false, message: "Invalid email" };
  if (!isValidPassword.test(password))
    return { status: false, message: "Invalid Password. Please try again" };
  if (password !== confirmPassword)
    return {
      status: false,
      message: "Password and Confirm password are not same",
    };

  const auth = getAuth();
  let status = {};
  createUserWithEmailAndPassword(auth, email, password, username)
    .then((userCredential) => {
      const user = userCredential.user;
      status = {
        status: true,
        message: `${username} is signed up succesfully!`,
      };
    })
    .catch((error) => {
      status = { status: false, message: error.message };
    });
  return status;
}
