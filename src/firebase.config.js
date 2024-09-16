import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAnj4DADeNV2fZCHPprQJ_qmKEQ8QhUgCg",
  authDomain: "to-do-list-a704b.firebaseapp.com",
  projectId: "to-do-list-a704b",
  storageBucket: "to-do-list-a704b.appspot.com",
  messagingSenderId: "984785424285",
  appId: "1:984785424285:web:77129e3be29c8711f36974"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };