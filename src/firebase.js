// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseKey } from "./keys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "chess-bbb19.firebaseapp.com",
  projectId: "chess-bbb19",
  storageBucket: "chess-bbb19.appspot.com",
  messagingSenderId: "738315442072",
  appId: "1:738315442072:web:52b53e7780071057f47ded",
  measurementId: "G-0S6HKDEQE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);