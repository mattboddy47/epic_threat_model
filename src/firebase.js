// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore'

// Epic Threat Model's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1ygKpFN3XDPfhW3JRinUvLuMV_gn_qyo",
  authDomain: "simple-threat-model.firebaseapp.com",
  projectId: "simple-threat-model",
  storageBucket: "simple-threat-model.appspot.com",
  messagingSenderId: "323623352657",
  appId: "1:323623352657:web:27675b9e48c0f41e2bfb70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
