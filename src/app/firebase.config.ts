// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRV4XoCxLYHMlqvIzzcqIf8MD0LtIK1Ak",
  authDomain: "monostore101.firebaseapp.com",
  projectId: "monostore101",
  storageBucket: "monostore101.appspot.com",
  messagingSenderId: "103083663532",
  appId: "1:103083663532:web:06e49d51b1c333bd2c3f09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  const db = getFirestore();
  export const storage = getStorage(app);
  
  export default db;