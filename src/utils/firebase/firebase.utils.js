import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Setting up user documents
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  // if user data exists
  return userDocRef;
};
