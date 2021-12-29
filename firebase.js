// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRqKPER3TH008w3naATIjQOy8DcQYA3qY",
  authDomain: "forum-8f2e6.firebaseapp.com",
  databaseURL: "https://forum-8f2e6.firebaseio.com",
  projectId: "forum-8f2e6",
  storageBucket: "forum-8f2e6.appspot.com",
  messagingSenderId: "328481382959",
  appId: "1:328481382959:web:6e2ed6c0796469c2439cda",
  measurementId: "G-ZMTD4JKPL0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
