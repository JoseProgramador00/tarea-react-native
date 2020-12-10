import firebase from 'firebase'
import 'firebase/firestore'
import App from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyAoiQoxJZEy9qsA_tB6WTaO7t-Hep4U56Q",
    authDomain: "prestamos-dfb15.firebaseapp.com",
    databaseURL: "https://prestamos-dfb15.firebaseio.com",
    projectId: "prestamos-dfb15",
    storageBucket: "prestamos-dfb15.appspot.com",
    messagingSenderId: "251707395916",
    appId: "1:251707395916:web:1c232ae201140af68989e9",
    measurementId: "G-SFPJSJ5TCW"
  };
  // Initialize Firebase
  App.initializeApp(firebaseConfig);
  App.analytics();

  const db = firebase.firestore();

  export default {
    firebase,
    db
  };