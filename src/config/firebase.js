import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getDatabase } from '@firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBOyiu_l_-VoxdJVgZnR-QcMLA7D2pQZmk",
  authDomain: "homeautmicro.firebaseapp.com",
  databaseURL: "https://homeautmicro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "homeautmicro",
  storageBucket: "homeautmicro.appspot.com",
  messagingSenderId: "33296336985",
  appId: "1:33296336985:web:f4f492e9d6c5d23f758948",
  measurementId: "G-HXBB3S5D2N"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);