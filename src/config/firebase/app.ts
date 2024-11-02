import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCByjjHXm7UPaiBbr7ILIgo4ak26YZH0Vo",
  authDomain: "ing-economica-27bbb.firebaseapp.com",
  projectId: "ing-economica-27bbb",
  storageBucket: "ing-economica-27bbb.appspot.com",
  messagingSenderId: "552105170162",
  appId: "1:552105170162:web:51f064d7126e0586e62c6b"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
