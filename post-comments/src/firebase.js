// src/firebase.js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOTkgMx5mHmNFI26ojfpM7SWbSYRZFDqc",
  authDomain: "blog-839ab.firebaseapp.com",
  projectId: "blog-839ab",
  storageBucket: "blog-839ab.firebasestorage.app",
  messagingSenderId: "60176958105",
  appId: "1:60176958105:web:7d54d12a25de79279fee08",
  measurementId: "G-75B33LZJHH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
