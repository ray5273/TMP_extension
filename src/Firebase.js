import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_d7o3MIvbgpLik2LPy7Mze_sQ2Or4NgE",
    authDomain: "jsp-tmp.firebaseapp.com",
    databaseURL: "https://jsp-tmp.firebaseio.com",
    projectId: "jsp-tmp",
    storageBucket: "jsp-tmp.appspot.com",
    messagingSenderId: "161790863624"
};
// Firebase App is always required and must be first
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;