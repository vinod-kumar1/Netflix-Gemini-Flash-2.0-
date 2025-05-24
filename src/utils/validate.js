import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
  let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  let isValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  if (isValidEmail && isValidPassword) return true;
  if (!isValidEmail) message += "Invalid email. ";
  if (!isValidPassword) message += "Password length should be greater than 8.";
  return message;
}
