import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4PFneVqQnuyLEN3MA0L2GP-FJi35em3I",
  authDomain: "crwn-clothing-db-52965.firebaseapp.com",
  projectId: "crwn-clothing-db-52965",
  storageBucket: "crwn-clothing-db-52965.appspot.com",
  messagingSenderId: "642569183845",
  appId: "1:642569183845:web:704aed6a0074cc58c95c8c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

//diffrenet signin methods for Google
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Setting up user documents
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userAuth);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    //if user data does not exist
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // if user data exists
  return userDocRef;
};

export const createAuthUserWithEmaiAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
