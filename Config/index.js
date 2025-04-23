// Import the functions you need from the SDKs you need
import { createClient } from "@supabase/supabase-js";
import  app  from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
};

const supabaseKey = 
const supabaseUrl = 
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;