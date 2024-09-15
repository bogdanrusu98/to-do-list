import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBnT8ptzWVmGN6yo9TjAHoRvKmzS6ooogE",
  authDomain: "house-marketplace-app-e7b14.firebaseapp.com",
  projectId: "house-marketplace-app-e7b14",
  storageBucket: "house-marketplace-app-e7b14.appspot.com",
  messagingSenderId: "1089176571513",
  appId: "1:1089176571513:web:3f6dd99cfbc9975d184ea8"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };