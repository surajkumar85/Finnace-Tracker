import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCNrvO3KotVPJkF0bg1nEPeoVxZbXtAH0",
  authDomain: "ftracker-ac867.firebaseapp.com",
  projectId: "ftracker-ac867",
  storageBucket: "ftracker-ac867.appspot.com",
  messagingSenderId: "807175785744",
  appId: "1:807175785744:web:1269e7da8639b6f0692995",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const timestamp = Timestamp.now();
