const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// Add Firebase SDK Snippet
const firebaseConfig = {
  apiKey: "AIzaSyAuY6f0zzmgKkv6LSDDa2__lD4DOIsxN24",
  authDomain: "demoflutter-706b1.firebaseapp.com",
  projectId: "demoflutter-706b1",
  storageBucket: "demoflutter-706b1.appspot.com",
  messagingSenderId: "615467633666",
  appId: "1:615467633666:web:3ee4cc427c5fd5cca42b1b"
};

firebase.initializeApp(firebaseConfig);



module.exports = firebase;
