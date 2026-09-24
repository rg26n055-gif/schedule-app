import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const eventId = params.get("event");

const eventInfo =
  document.getElementById("eventInfo");

async function loadEvent() {

  if (!eventId) {
    eventInfo.textContent =
      "イベントが指定されていません。";

    return;
  }

  try {

    const eventRef =
      doc(db, "events", eventId);

    const snapshot =
      await getDoc(eventRef);

    if (!snapshot.exists()) {

      eventInfo.textContent =
        "イベントが見つかりません。";

      return;
    }

    const data =
  snapshot.data();

eventInfo.textContent =
  `${data.title}｜${data.startDate} 〜 ${data.endDate}`;

window.dispatchEvent(
  new CustomEvent("eventLoaded", {
    detail: {
      id: eventId,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      isOpen: data.isOpen !== false
    }
  })
);

console.log(
  "イベント読み込み成功:",
  data
);
  } catch (error) {

    console.error(
      "イベント読み込みエラー:",
      error
    );

    eventInfo.textContent =
      "イベント情報を読み込めませんでした。";
  }
}

loadEvent();