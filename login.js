import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loginBtn =
document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  const querySnapshot =
    await getDocs(collection(db, "user"));

  let validUser = false;

  querySnapshot.forEach((doc) => {

    const user = doc.data();

    if(
      user.username === username &&
      user.password === password
    ){
      validUser = true;
    }

  });

  if(validUser){

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    window.location.href =
      "dashboard.html";

  } else {

    alert(
      "❌ Invalid Username or Password"
    );

  }

});