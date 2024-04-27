import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAe4vKb0W739WZcJSyaBMMgyl2uIJdbNDM",
  authDomain: "voyawander-2014f.firebaseapp.com",
  projectId: "voyawander-2014f",
  storageBucket: "voyawander-2014f.appspot.com",
  messagingSenderId: "731205134232",
  appId: "1:731205134232:web:e5b557b6afc4303e57eded",
  measurementId: "G-8Z6NH7E1NT"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {app,auth,provider};