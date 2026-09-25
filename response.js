import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

window.saveResponseToFirestore = async function(eventId, data) {

  if (!eventId) {
    throw new Error("イベントIDがありません");
  }

  const docRef = await addDoc(
    collection(
      db,
      "events",
      eventId,
      "responses"
    ),
    {
      name: data.name,
      answers: data.answers,
      createdAt: serverTimestamp()
    }
  );

  return docRef.id;
};