// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACGqf86fl1EJnvcv7JOnSofTiTLd8DDgs",
  authDomain: "stack-overflow-clone-9502b.firebaseapp.com",
  projectId: "stack-overflow-clone-9502b",
  storageBucket: "stack-overflow-clone-9502b.appspot.com",
  messagingSenderId: "577672318155",
  appId: "1:577672318155:web:47940323a6251dc32d1f4e",
  measurementId: "G-W2MXVGXP4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };