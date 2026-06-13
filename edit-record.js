import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const recordId =
localStorage.getItem("editRecordId");

async function loadRecord() {

  const docRef =
    doc(db, "dailyRecords", recordId);

  const docSnap =
    await getDoc(docRef);

  if(docSnap.exists()) {

    const data = docSnap.data();

    document.getElementById("bigReceived").value =
      data.bigReceived;

    document.getElementById("bigSold").value =
      data.bigSold;

    document.getElementById("bigDead").value =
      data.bigDead;

    document.getElementById("smallReceived").value =
      data.smallReceived;

    document.getElementById("smallSold").value =
      data.smallSold;

    document.getElementById("smallDead").value =
      data.smallDead;

    document.getElementById("cash").value =
      data.cash;

    document.getElementById("upi").value =
      data.upi;

  }

}

document.getElementById("updateBtn")
.addEventListener("click", async () => {

  const bigReceived =
    Number(document.getElementById("bigReceived").value);

  const bigSold =
    Number(document.getElementById("bigSold").value);

  const bigDead =
    Number(document.getElementById("bigDead").value);

  const smallReceived =
    Number(document.getElementById("smallReceived").value);

  const smallSold =
    Number(document.getElementById("smallSold").value);

  const smallDead =
    Number(document.getElementById("smallDead").value);

  const cash =
    Number(document.getElementById("cash").value);

  const upi =
    Number(document.getElementById("upi").value);

  const bigRemaining =
    bigReceived - bigSold - bigDead;

  const smallRemaining =
    smallReceived - smallSold - smallDead;

  const totalCollection =
    cash + upi;

  await updateDoc(
    doc(db, "dailyRecords", recordId),
    {
      bigReceived,
      bigSold,
      bigDead,
      bigRemaining,

      smallReceived,
      smallSold,
      smallDead,
      smallRemaining,

      cash,
      upi,

      totalCollection
    }
  );

  alert("✅ Record Updated");

  window.location.href =
    "history.html";

});

loadRecord();