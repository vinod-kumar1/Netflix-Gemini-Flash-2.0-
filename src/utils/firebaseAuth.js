// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzDoNEo5tyLNAJ1urtENDBdgb0nR3qkxA",
  authDomain: "netflix-gpt-4ded3.firebaseapp.com",
  projectId: "netflix-gpt-4ded3",
  storageBucket: "netflix-gpt-4ded3.firebasestorage.app",
  messagingSenderId: "244766817905",
  appId: "1:244766817905:web:ab4cfc8a17ad800070a5d0",
  measurementId: "G-V20RYK1FX9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
