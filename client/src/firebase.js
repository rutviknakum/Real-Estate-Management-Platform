// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCgLdcy2t_6ts-nnj6CvrS_vfufgQfQDA",
  authDomain: "realestate-8bcc3.firebaseapp.com",
  projectId: "realestate-8bcc3",
  storageBucket: "realestate-8bcc3.appspot.com",
  messagingSenderId: "330959785670",
  appId: "1:330959785670:web:70d259a20cb078bf6c91c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// export const app = initializeApp(firebaseConfig);

export { app, auth, provider };
