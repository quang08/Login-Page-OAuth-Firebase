// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUzs5IhTlopsd9VXOqOamri5-iyzR1S_k",
  authDomain: "login-e8233.firebaseapp.com",
  projectId: "login-e8233",
  storageBucket: "login-e8233.appspot.com",
  messagingSenderId: "131444742881",
  appId: "1:131444742881:web:bfc14618b8bd2a6d6575a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
