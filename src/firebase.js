// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyBgUu36Nv7go_RuL5SUayz-slKlLXHoDUo",

    authDomain: "flatsome-ecommerce.firebaseapp.com",

    projectId: "flatsome-ecommerce",

    storageBucket: "flatsome-ecommerce.firebasestorage.app",

    messagingSenderId: "114143823717",

    appId: "1:114143823717:web:8722a04737023fa750838c",

    measurementId: "G-8GWQH99671"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
