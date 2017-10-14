import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
        apiKey: "AIzaSyD2imZSkfL08muqulR4A6ifre-6CEkmKqE",
        authDomain: "tcc1-fd9f5.firebaseapp.com",
        databaseURL: "https://tcc1-fd9f5.firebaseio.com",
        projectId: "tcc1-fd9f5",
        storageBucket: "tcc1-fd9f5.appspot.com",
        messagingSenderId: "445528866197"
    });
  }
}

module.exports = Firebase;
