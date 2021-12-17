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

const firebaseConfig = {
  apiKey: "AIzaSyAfzuHCk1wAQDxGugNkKgClHh-Ed1NlRo4",
  authDomain: "organizer-59d66.firebaseapp.com",
  projectId: "organizer-59d66",
  storageBucket: "organizer-59d66.appspot.com",
  messagingSenderId: "269531459889",
  appId: "1:269531459889:web:369d5d4f22cd69e6aa0010",
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
