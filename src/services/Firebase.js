// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//import "firebase/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBAs6rYJTsiEOyGObgmuwiXJW27mcq975w",
  authDomain: "co-act-60569.firebaseapp.com",
  projectId: "co-act-60569",
  storageBucket: "co-act-60569.appspot.com",
  messagingSenderId: "266130757368",
  appId: "1:266130757368:web:30137be081cbd3df3c8d0d",
  measurementId: "G-W49EXYTTTB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
