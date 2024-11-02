import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase/app";

export const logMovement = async (description: string, userId: string) => {
  try {
    await addDoc(collection(db, "movements"), {
      userId: userId,
      description,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error logging movement:", error);
  }
};
