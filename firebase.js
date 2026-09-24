import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_5Nag4DsiRZedzMF5LL6sOCVyMgTaWbU",
  authDomain: "smart-schedule-coordinat-79ae1.firebaseapp.com",
  projectId: "smart-schedule-coordinat-79ae1",
  storageBucket: "smart-schedule-coordinat-79ae1.firebasestorage.app",
  messagingSenderId: "346372869754",
  appId: "1:346372869754:web:bdef02ad29dafb2e15f5c3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();

console.log("Firebase connected");