import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

if (process.env.NODE_ENV !== "production") require("./secret_key");

const FIRESTORE_API_KEY = process.env.FIRESTORE_API_KEY;

export const firebaseConfig = {
  apiKey: FIRESTORE_API_KEY,
  authDomain: "pawsome-ce323.firebaseapp.com",
  databaseURL: "https://pawsome-ce323.firebaseio.com",
  projectId: "pawsome-ce323",
  storageBucket: "pawsome-ce323.appspot.com",
  messagingSenderId: "12345-insert-yourse",
  appId: "1:277794075313:ios:5c7fdb570c124882e12890",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
