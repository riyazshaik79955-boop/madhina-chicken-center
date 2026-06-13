import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDP9wauAI4VWRiGyau9L9b52BvMsDlxOU4",
  authDomain: "madhina-d2593.firebaseapp.com",
  projectId: "madhina-d2593",
  storageBucket: "madhina-d2593.firebasestorage.app",
  messagingSenderId: "201705581181",
  appId: "1:201705581181:web:212a47ccee50c890f19f14"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };