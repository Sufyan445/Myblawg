// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBthj1FY6bnn25EpaRfDZgergnR2GrnOdI",
  authDomain: "blog-ec747.firebaseapp.com",
  projectId: "blog-ec747",
  storageBucket: "blog-ec747.appspot.com",
  messagingSenderId: "304186441260",
  appId: "1:304186441260:web:d9acf4f11f0583ebfa1b89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const db = getFirestore(app);
export { storage, db };
