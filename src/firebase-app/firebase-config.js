import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // changed import statement
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAAVx_K45ZDmfl7a14hbiyFhp-fr4WKjrg",
    authDomain: "mokey-blog-98d3a.firebaseapp.com",
    projectId: "mokey-blog-98d3a",
    storageBucket: "mokey-blog-98d3a.appspot.com",
    messagingSenderId: "892250924007",
    appId: "1:892250924007:web:40c5847e18d9a015a85342",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
