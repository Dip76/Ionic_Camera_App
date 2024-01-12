// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL8tDBJGgM0lKgfVQ5rI-B2bI6qAXv5XQ",
  authDomain: "myportfolio-65ba1.firebaseapp.com",
  databaseURL: "https://myportfolio-65ba1-default-rtdb.firebaseio.com",
  projectId: "myportfolio-65ba1",
  storageBucket: "myportfolio-65ba1.appspot.com",
  messagingSenderId: "704208857803",
  appId: "1:704208857803:web:c966047b5243ec3777094e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app, "gs://myportfolio-65ba1.appspot.com/");