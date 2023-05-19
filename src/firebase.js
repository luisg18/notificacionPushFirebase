// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyASJBzsUmzEJK-7spzR3Up0GodgcX3FiNo",
  authDomain: "notificacioneshup.firebaseapp.com",
  projectId: "notificacioneshup",
  storageBucket: "notificacioneshup.appspot.com",
  messagingSenderId: "1012811821170",
  appId: "1:1012811821170:web:fd3d3dc80bad6adf4212eb",
  measurementId: "G-40B5LWEC0E"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);