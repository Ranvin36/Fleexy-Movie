import{initializeApp} from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyCoF0eFwQFKOEERBH4niSnDwr-fJJWMp30",
    authDomain: "my-movie-a7fe9.firebaseapp.com",
    databaseURL: "https://my-movie-a7fe9-default-rtdb.firebaseio.com",
    projectId: "my-movie-a7fe9",
    storageBucket: "my-movie-a7fe9.appspot.com",
    messagingSenderId: "874542332268",
    appId: "1:874542332268:web:fad7ea3e662e7a51db1b49",
    measurementId: "G-T0FDGGV15J"
  };

  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const provider = new GoogleAuthProvider();
  export const db = getFirestore(app)
  
  export default provider