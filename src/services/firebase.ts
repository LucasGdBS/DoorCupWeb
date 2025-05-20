import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const databaseURL = import.meta.env.VITE_DATA_BASE_URL as string;

const firebaseConfig = {
  databaseURL: databaseURL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set };
