// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu-bUj_exTRd-c-tGrHh9NfQ0Jh5mJy9c",
  authDomain: "assginment-10-6b155.firebaseapp.com",
  projectId: "assginment-10-6b155",
  storageBucket: "assginment-10-6b155.firebasestorage.app",
  messagingSenderId: "921143666906",
  appId: "1:921143666906:web:5edbb69a8dd6757cca1de3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);