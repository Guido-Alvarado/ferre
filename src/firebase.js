// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeHU-5DK_kmSsDgA_TLv_JyBG2GI0oZTs",
  authDomain: "trabajoprueba-a3c4d.firebaseapp.com",
  projectId: "trabajoprueba-a3c4d",
  storageBucket: "trabajoprueba-a3c4d.appspot.com",
  messagingSenderId: "470611309219",
  appId: "1:470611309219:web:e01e3e536f81f9b8fc8516",
  measurementId: "G-NT9SZEQJ0B"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportar servicios
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
