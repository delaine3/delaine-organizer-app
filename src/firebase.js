import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlbAcw8uM21ci6gjcK9nnU8SueyOdOGsA",
  authDomain: "firefly-16696.firebaseapp.com",
  projectId: "firefly-16696",
  storageBucket: "firefly-16696.appspot.com",
  messagingSenderId: "937474357471",
  appId: "1:937474357471:web:76690395960b787f6e916a",
  measurementId: "G-M8GW0MKM8Q",
};
// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "posts");

//get collection datat
getDocs(colRef).then((snapshot) => {
  let posts = [];
  snapshot.docs.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });

  console.log(posts);
});

const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}
