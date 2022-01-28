import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth,  GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBdwNhTc0IkAI9RcLnsNTPK1iecPdt89ek",
  authDomain: "facebook-clone-v2-c0fb3.firebaseapp.com",
  projectId: "facebook-clone-v2-c0fb3",
  storageBucket: "facebook-clone-v2-c0fb3.appspot.com",
  messagingSenderId: "658938119495",
  appId: "1:658938119495:web:1814c93a0d608ee1347862",
  measurementId: "G-4M67TJLPP2"
};


const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage()
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()

export {db, storage, auth, provider}