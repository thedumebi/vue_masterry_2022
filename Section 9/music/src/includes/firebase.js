import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxUrL8k8W39xBIFMgywpkKCqRVCetfazs",
  authDomain: "music-b0974.firebaseapp.com",
  projectId: "music-b0974",
  storageBucket: "music-b0974.appspot.com",
  // messagingSenderId: "504881939548",
  appId: "1:504881939548:web:ca14f81644bfcff7e0d299",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((err) => {
  console.log(`Firebase persistence error ${err.code}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export { auth, db, usersCollection, songsCollection, commentsCollection, storage };
