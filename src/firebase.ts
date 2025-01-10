import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFNrQkd9m1HmoabnzndvNbV5W6goIqX74",
  authDomain: "white-oak-83f24.firebaseapp.com",
  projectId: "white-oak-83f24",
  storageBucket: "white-oak-83f24.firebasestorage.app",
  messagingSenderId: "1077953152735",
  appId: "1:1077953152735:web:ff4357f8d265dd6ce8cb6a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const usersCollectionRef = collection(db, 'users');
