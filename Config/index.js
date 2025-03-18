// Import the functions you need from the SDKs you need
import  app  from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuC_2AheaBYzHoCBMy9humVyiy9JyYd24",
  authDomain: "dev-mobile-789f5.firebaseapp.com",
  projectId: "dev-mobile-789f5",
  storageBucket: "dev-mobile-789f5.firebasestorage.app",
  messagingSenderId: "81195571945",
  appId: "1:81195571945:web:3384ce73247049cd862e78",
  measurementId: "G-TTGS5FTTG5"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;