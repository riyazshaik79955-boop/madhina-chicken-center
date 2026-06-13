import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const historyContainer =
document.getElementById("historyContainer");

let allRecords = [];

async function loadHistory() {

  historyContainer.innerHTML = "";

  const querySnapshot =
    await getDocs(collection(db, "dailyRecords"));

  allRecords = [];

  querySnapshot.forEach((document) => {

    const data = document.data();

    allRecords.push({
      id: document.id,
      ...data
    });

  });

  displayRecords(allRecords);

}

function displayRecords(records) {

  historyContainer.innerHTML = "";

  if (records.length === 0) {

    historyContainer.innerHTML = `
      <div class="history-card">
        <h2>No Records Found</h2>
      </div>
    `;

    return;
  }

  records.forEach((data) => {

    historyContainer.innerHTML += `

    <div class="history-card">

      <h2>
      📅 ${new Date(data.date).toLocaleDateString("en-IN")}
      </h2>

      <p><strong>Big Received:</strong> ${data.bigReceived}</p>
      <p><strong>Big Sold:</strong> ${data.bigSold}</p>
      <p><strong>Big Dead:</strong> ${data.bigDead}</p>
      <p><strong>Big Remaining:</strong> ${data.bigRemaining}</p>

      <hr>

      <p><strong>Small Received:</strong> ${data.smallReceived}</p>
      <p><strong>Small Sold:</strong> ${data.smallSold}</p>
      <p><strong>Small Dead:</strong> ${data.smallDead}</p>
      <p><strong>Small Remaining:</strong> ${data.smallRemaining}</p>

      <hr>

      <p><strong>Cash:</strong> ₹${data.cash}</p>
      <p><strong>UPI:</strong> ₹${data.upi}</p>
      <p><strong>Total Collection:</strong> ₹${data.totalCollection}</p>

      <br>

      <button onclick="editRecord('${data.id}')">
        ✏️ Edit Record
      </button>

      &nbsp;&nbsp;

      <button onclick="deleteRecord('${data.id}')">
        🗑 Delete Record
      </button>

    </div>

    `;
  });

}

window.searchRecord = function () {

  const selectedDate =
    document.getElementById("searchDate").value;

  if (!selectedDate) {
    alert("Select a date");
    return;
  }

  const filtered = allRecords.filter(record => {

    const recordDate =
      new Date(record.date)
      .toISOString()
      .split("T")[0];

    return recordDate === selectedDate;

  });

  displayRecords(filtered);

}

window.editRecord = function (id) {

  localStorage.setItem(
    "editRecordId",
    id
  );

  window.location.href =
    "edit-record.html";

}

window.deleteRecord = async function (id) {

  const confirmDelete =
    confirm("Delete this record?");

  if (!confirmDelete) return;

  await deleteDoc(
    doc(db, "dailyRecords", id)
  );

  alert("✅ Record Deleted");

  loadHistory();

}

window.loadHistory = loadHistory;

loadHistory();