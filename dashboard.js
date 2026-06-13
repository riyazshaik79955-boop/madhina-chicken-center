import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadDashboard() {

  try {

    const querySnapshot =
      await getDocs(collection(db, "dailyRecords"));

    let latestRecord = null;

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      if (
        !latestRecord ||
        new Date(data.date) >
        new Date(latestRecord.date)
      ) {
        latestRecord = data;
      }

    });

    if (latestRecord) {

      document.getElementById("bigRemaining").innerText =
        latestRecord.bigRemaining + " Birds";

      document.getElementById("smallRemaining").innerText =
        latestRecord.smallRemaining + " Birds";

      document.getElementById("cashAmount").innerText =
        "₹" + latestRecord.cash;

      document.getElementById("upiAmount").innerText =
        "₹" + latestRecord.upi;

      document.getElementById("totalCollection").innerText =
        "₹" + latestRecord.totalCollection;

      document.getElementById("todayBigSold").innerText =
        "🐔 Big Sold Today: " + latestRecord.bigSold;

      document.getElementById("todaySmallSold").innerText =
        "🐔 Small Sold Today: " + latestRecord.smallSold;

      document.getElementById("todayCash").innerText =
        "💰 Cash Today: ₹" + latestRecord.cash;

      document.getElementById("todayUPI").innerText =
        "📱 UPI Today: ₹" + latestRecord.upi;

      document.getElementById("todayTotal").innerText =
        "💵 Total Today: ₹" + latestRecord.totalCollection;

      const alertBox =
        document.getElementById("alertBox");

      let alerts = [];

      if (latestRecord.bigRemaining < 20) {
        alerts.push(
          `🐔 Big Broiler Low Stock (${latestRecord.bigRemaining} Birds)`
        );
      }

      if (latestRecord.smallRemaining < 10) {
        alerts.push(
          `🐔 Small Broiler Low Stock (${latestRecord.smallRemaining} Birds)`
        );
      }

      if (alerts.length > 0) {

        alertBox.style.display = "block";

        alertBox.innerHTML =
          "⚠ LOW STOCK ALERT<br><br>" +
          alerts.join("<br>");

      }

    }

  } catch (error) {

    console.error("Dashboard Error:", error);

  }

}

loadDashboard();