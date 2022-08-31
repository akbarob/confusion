import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import {getAnalytics} from 'firebase/analytics'
import {getAuth } from 'firebase/auth'


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app)
const analytics = getAnalytics(app);