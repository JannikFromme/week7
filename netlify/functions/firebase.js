const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyD1d6Wt7-FVxzptLm3FyFBC-BZgN7rW9UQ",
    authDomain: "kiei-451-ec768.firebaseapp.com",
    projectId: "kiei-451-ec768",
    storageBucket: "kiei-451-ec768.appspot.com",
    messagingSenderId: "432342031126",
    appId: "1:432342031126:web:88d1dbb4ea733c70face37"
  } // get from project settings on firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase