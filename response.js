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
      env: data.env,
      eng: data.eng,
      online: data.online,
      createdAt: serverTimestamp()
    }
  );

  return docRef.id;
};