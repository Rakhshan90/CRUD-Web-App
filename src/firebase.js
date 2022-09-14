// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD4Tm1kQ0b53rAifmQ7Uw2a66JgLPTUcdw",
  authDomain: "react-crud-61e6f.firebaseapp.com",
  projectId: "react-crud-61e6f",
  storageBucket: "react-crud-61e6f.appspot.com",
  messagingSenderId: "88646176475",
  appId: "1:88646176475:web:8ea6b40e8c0a3aa7d386fe",
  measurementId: "G-9ZLD2CEGG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);