// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVYI6I8okujzBz5F4rfbDQlZhX3AS8b_g",
  authDomain: "netflixgpt-7d9ea.firebaseapp.com",
  projectId: "netflixgpt-7d9ea",
  storageBucket: "netflixgpt-7d9ea.appspot.com",
  messagingSenderId: "1030246307162",
  appId: "1:1030246307162:web:20c14c7eec69368c784f63",
  measurementId: "G-J0PLQ4K23X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();