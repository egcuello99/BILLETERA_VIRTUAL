import {
  doc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  onSnapshot,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";

import { db } from "../config/firebase/app";
import {
  UserLogin,
  UserProfileForm,
  UserRegister,
} from "../domain/entities/user";

const authRef: CollectionReference<DocumentData> = collection(db, "users");

export const authlogins = async (formData: UserLogin) => {
  try {
    const q = query(
      authRef,
      where("cedula", "==", formData.cedula),
      where("password", "==", formData.password)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if (querySnapshot.empty) {
      return false;
    } else {
      return querySnapshot.docs[0].data();
    }
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

export const authRegisters = async (formData: UserRegister) => {
  try {
    const cedulaQuerySnapshot = await query(
      authRef,
      where("cedula", "==", formData.cedula)
    );
    const cedulaquerySnapshot = await getDocs(cedulaQuerySnapshot);

    if (!cedulaquerySnapshot.empty) {
      throw new Error("El usuario con esta cédula ya existe");
    }

    const emailQuery = query(authRef, where("email", "==", formData.email));
    const emailQuerySnapshot = await getDocs(emailQuery);

    if (!emailQuerySnapshot.empty) {
      throw new Error("El usuario con este correo ya existe");
    }
    formData.role = "user";

    const docRef = await addDoc(authRef, formData);
    await updateDoc(docRef, { id: docRef.id });
  } catch (error: any) {
    throw new Error(error.message || "Error al crear el usuario");
  }
};

export const getUser = async (cedula: string) => {
  try {
    const cedulaQuery = await query(authRef, where("cedula", "==", cedula));
    const cedulaquerySnapshot = await getDocs(cedulaQuery);
    if (cedulaquerySnapshot) {
      return cedulaquerySnapshot.docs[0].data();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error al obtener el usuario");
  }
};

export const updateUser = async (
  id: string,
  newData: Partial<UserProfileForm>
) => {
  try {
    const docRef = doc(authRef, id);
    await updateDoc(docRef, newData);
    return newData;
  } catch (error) {
    throw new Error("Error al actualizar el usuario: ");
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const cedulaQuery = await query(authRef, where("email", "==", email));
    const cedulaquerySnapshot = await getDocs(cedulaQuery);

    if (!cedulaquerySnapshot.empty) {
      const docRef = cedulaquerySnapshot.docs[0].ref;
      // Hash the password here if you are using plain text in a real application
      await updateDoc(docRef, { password: newPassword });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error al restablecer la contraseña");
  }
};
