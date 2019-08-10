
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "socialhour.firebaseapp.com",
    databaseURL: "https://socialhour.firebaseio.com",
    projectId: "socialhour",
    storageBucket: "socialhour.appspot.com",
    messagingSenderId: "1076044135012",
    appId: "1:1076044135012:web:9b1de87c5d923fe5"
};


firebase.initializeApp(firebaseConfig);

const fb = {
    auth: firebase.auth()
}

export default fb;