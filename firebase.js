import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

console.log("Firebase connected");

async function testWrite() {
  try {
    const docRef = await addDoc(collection(db, "test"), {
      message: "Hello Firestore",
      createdAt: serverTimestamp()
    });

    console.log("保存成功:", docRef.id);

  } catch (error) {
    console.error("保存エラー:", error);
  }
}

testWrite();