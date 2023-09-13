// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbADF5EnKriulnHg-YP7b7rTBYpe2rSIY",
  authDomain: "todolist-c73ee.firebaseapp.com",
  projectId: "todolist-c73ee",
  storageBucket: "todolist-c73ee.appspot.com",
  messagingSenderId: "1010620503760",
  appId: "1:1010620503760:web:09eb371e243ce53e0670d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db=getFirestore()