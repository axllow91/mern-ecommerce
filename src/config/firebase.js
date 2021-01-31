import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxHkX1-WAPVuua1SWI10ud3tceufPVFPU",
  authDomain: "ecommerce-mrn.firebaseapp.com",
  projectId: "ecommerce-mrn",
  storageBucket: "ecommerce-mrn.appspot.com",
  messagingSenderId: "588132003897",
  appId: "1:588132003897:web:9dce0c0ec2880a3c5b9de8",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
