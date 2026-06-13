import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadReports() {

  const querySnapshot =
    await getDocs(collection(db, "dailyRecords"));

  let totalCash = 0;
  let totalUPI = 0;
  let grandTotal = 0;

  let bigSoldTotal = 0;
  let smallSoldTotal = 0;

  let recordCount = 0;

  let monthCash = 0;
  let monthUPI = 0;
  let monthCollection = 0;

  let monthBigSold = 0;
  let monthSmallSold = 0;

  let chartLabels = [];
  let chartData = [];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    totalCash += data.cash || 0;
    totalUPI += data.upi || 0;
    grandTotal += data.totalCollection || 0;

    bigSoldTotal += data.bigSold || 0;
    smallSoldTotal += data.smallSold || 0;

    recordCount++;

    chartLabels.push(
      new Date(data.date).toLocaleDateString("en-IN")
    );

    chartData.push(
      data.totalCollection || 0
    );

    const recordDate = new Date(data.date);

    if (
      recordDate.getMonth() === currentMonth &&
      recordDate.getFullYear() === currentYear
    ) {

      monthCash += data.cash || 0;
      monthUPI += data.upi || 0;
      monthCollection += data.totalCollection || 0;

      monthBigSold += data.bigSold || 0;
      monthSmallSold += data.smallSold || 0;

    }

  });

  document.getElementById("totalCash").innerText =
    "₹" + totalCash;

  document.getElementById("totalUPI").innerText =
    "₹" + totalUPI;

  document.getElementById("grandTotal").innerText =
    "₹" + grandTotal;

  document.getElementById("bigSoldTotal").innerText =
    bigSoldTotal + " Birds";

  document.getElementById("smallSoldTotal").innerText =
    smallSoldTotal + " Birds";

  document.getElementById("recordCount").innerText =
    recordCount;

  document.getElementById("monthCash").innerText =
    "₹" + monthCash;

  document.getElementById("monthUPI").innerText =
    "₹" + monthUPI;

  document.getElementById("monthCollection").innerText =
    "₹" + monthCollection;

  document.getElementById("monthBigSold").innerText =
    monthBigSold + " Birds";

  document.getElementById("monthSmallSold").innerText =
    monthSmallSold + " Birds";

  const ctx =
    document.getElementById("salesChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: chartLabels,
      datasets: [{
        label: "Collection ₹",
        data: chartData,
        borderWidth: 3,
        tension: 0.3
      }]
    },
    options: {
      responsive: true
    }
  });

}

loadReports();

document.getElementById("exportBtn")
.addEventListener("click", async () => {

  const querySnapshot =
    await getDocs(collection(db, "dailyRecords"));

  let content =
    "Date,Big Sold,Small Sold,Cash,UPI,Total Collection\n";

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    content +=
      `${data.date},${data.bigSold},${data.smallSold},${data.cash},${data.upi},${data.totalCollection}\n`;

  });

  const blob =
    new Blob([content], { type: "text/csv" });

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = "Madhina_Report.csv";

  a.click();

});