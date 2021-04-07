import firebase from "firebase";

export const firebaseConfig = {
    apiKey: "AIzaSyCmb6_1Gn6eHy4-2_2eIEOQuSNaUrSWeVg",
    authDomain: "whatsapp-clone-450b1.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-450b1.firebaseio.com",
    projectId: "whatsapp-clone-450b1",
    storageBucket: "whatsapp-clone-450b1.appspot.com",
    messagingSenderId: "400568560041",
    appId: "1:400568560041:web:062f131463978d2e35fcb8",
    measurementId: "G-07GB6HFD4L"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
