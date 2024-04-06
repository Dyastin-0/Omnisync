import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getDatabase } from '@firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCpkvO5sV6pi1pz_4Zi7MsM49w5vBKU8nk",
  authDomain: "esp32-wifi-firebase.firebaseapp.com",
  databaseURL: "https://esp32-wifi-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-wifi-firebase",
  storageBucket: "esp32-wifi-firebase.appspot.com",
  messagingSenderId: "711782122657",
  appId: "1:711782122657:web:2a9bd167263c7ddcd29ce0"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);