// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-dXQYIK0W2J1wY_sQYeiQauOtx70I03M",
  authDomain: "trainistry-74291.firebaseapp.com",
  projectId: "trainistry-74291",
  storageBucket: "trainistry-74291.firebasestorage.app",
  messagingSenderId: "368417715222",
  appId: "1:368417715222:web:3de88c7c8c5aa4fb833137",
  measurementId: "G-550GVL0Q3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);