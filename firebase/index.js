import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBxs5wngIU3sV17hQzZhDJJq9qVqfuuFxw",
    authDomain: "flick-it-373707.firebaseapp.com",
    databaseURL: "https://flick-it-373707-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "flick-it-373707",
    storageBucket: "flick-it-373707.appspot.com",
    messagingSenderId: "786822873271",
    appId: "1:786822873271:web:c223893f2f08e6c3a98d32"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
