import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async () => {

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

  // Empty Fields Validation
  if (
    bigReceived === 0 &&
    smallReceived === 0 &&
    cash === 0 &&
    upi === 0
  ) {
    alert("❌ Please enter record details");
    return;
  }

  // Stock Validation
  if (bigSold + bigDead > bigReceived) {
    alert("❌ Big Broiler Sold + Dead cannot exceed Received");
    return;
  }

  if (smallSold + smallDead > smallReceived) {
    alert("❌ Small Broiler Sold + Dead cannot exceed Received");
    return;
  }

  const bigRemaining =
    bigReceived - bigSold - bigDead;

  const smallRemaining =
    smallReceived - smallSold - smallDead;

  const totalCollection =
    cash + upi;

  const today = new Date();

  const record = {

    date: today.toISOString(),

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

  };

  try {

    await addDoc(
      collection(db, "dailyRecords"),
      record
    );

    alert("✅ Record Saved Successfully");

    // Clear Form
    document.getElementById("bigReceived").value = "";
    document.getElementById("bigSold").value = "";
    document.getElementById("bigDead").value = "";

    document.getElementById("smallReceived").value = "";
    document.getElementById("smallSold").value = "";
    document.getElementById("smallDead").value = "";

    document.getElementById("cash").value = "";
    document.getElementById("upi").value = "";

  } catch (error) {

    console.error(error);

    alert("❌ Error Saving Record");

  }

});