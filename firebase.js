import { initializeApp } from "firebase/app";


import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCtXpZehwD7VPwBwCwm_UV_VskQqxjc1DQ",
  authDomain: "campus-connect-123.firebaseapp.com",
  projectId: "campus-connect-123",
  storageBucket: "campus-connect-123.appspot.com",
  messagingSenderId: "80139995557",
  appId: "1:80139995557:web:ee37741c16c2ba59cec04c",
  measurementId: "G-VF246DQ9YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};









