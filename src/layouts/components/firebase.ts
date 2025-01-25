// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnj3yLPsxofhjFWRdpHgGDtQi0yRl89qg",
  authDomain: "login-auth-e4a9d.firebaseapp.com",
  projectId: "login-auth-e4a9d",
  storageBucket: "login-auth-e4a9d.firebasestorage.app",
  messagingSenderId: "571784405068",
  appId: "1:571784405068:web:e3b5f03a7dd81b1cb0d4e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
export default app;