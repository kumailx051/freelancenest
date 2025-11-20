// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA_k3jf53GIBeYDpkIRn0ASBaBV5XUXtA",
  authDomain: "freelancenest2.firebaseapp.com",
  projectId: "freelancenest2",
  storageBucket: "freelancenest2.firebasestorage.app",
  messagingSenderId: "574000969604",
  appId: "1:574000969604:web:aa063fb05901c83b22cfd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
