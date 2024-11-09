import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBqudY8Zlclb5lnu_950pmHdJlyRCAs22Q",
    authDomain: "raftlabs-78598.firebaseapp.com",
    projectId: "raftlabs-78598",
    storageBucket: "raftlabs-78598.firebasestorage.app",
    messagingSenderId: "110336593770",
    appId: "1:110336593770:web:1ecc9f123be924bc055f13",
    measurementId: "G-SQPHBRBGQX"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
