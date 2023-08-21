// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-eawgkpxZn1thA-TZKyb3S_-EjVp6opg",
    authDomain: "theproblemsolverv1.firebaseapp.com",
    databaseURL: "https://theproblemsolverv1-default-rtdb.firebaseio.com",
    projectId: "theproblemsolverv1",
    storageBucket: "theproblemsolverv1.appspot.com",
    messagingSenderId: "154028524301",
    appId: "1:154028524301:web:64bf2d362041ad74116644"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)
