// Import the functions you need from the SDKs you need
import { isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCUDbScQ66Z0MXcnwmj0dnrF6kYWorxdfo",
  authDomain: "ugoi-portfolio.firebaseapp.com",
  projectId: "ugoi-portfolio",
  storageBucket: "ugoi-portfolio.appspot.com",
  messagingSenderId: "845720737802",
  appId: "1:845720737802:web:258725ea0e567a1e0927f3",
  measurementId: "G-V6BB31YYZM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;

// Check if analytics is supported
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { app, analytics };
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
