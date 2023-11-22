// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcONuLDx4v-41YrKTJRx1lu0NZcmW5GRo",
  authDomain: "farmersmarket-403814.firebaseapp.com",
  databaseURL: "https://farmersmarket-403814-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "farmersmarket-403814",
  storageBucket: "farmersmarket-403814.appspot.com",
  messagingSenderId: "240486422076",
  appId: "1:240486422076:web:30d838e7cf50a64e1d5539",
  measurementId: "G-19ZXH75C9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;