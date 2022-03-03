// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyAl0xyq1LA4XeE_qk7-tZ6H2JUgBBgbivM",
    authDomain: "newsflix-e8cb7.firebaseapp.com",
    projectId: "newsflix-e8cb7",
    storageBucket: "newsflix-e8cb7.appspot.com",
    messagingSenderId: "227226733477",
    appId: "1:227226733477:web:4e21627946aecd5a09764c",
    measurementId: "G-CWPHZREKY4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;
