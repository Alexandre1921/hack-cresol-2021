/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyBMl7gwOElvs6HJ9uwXNdjJ_VD2Wk4HUmw",
    authDomain: "hack-cresol-2021.firebaseapp.com",
    projectId: "hack-cresol-2021",
    storageBucket: "hack-cresol-2021.appspot.com",
    messagingSenderId: "680584425116",
    appId: "1:680584425116:web:0cbdf673dd2a2dc06a0759",
    measurementId: "G-KE47941P45"
});

export const db = firebase.firestore();

export const auth = firebase.auth();

export default firebase;