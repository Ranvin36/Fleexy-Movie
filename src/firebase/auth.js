import {getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import provider from './config'
import { createLoginUserDocument } from './user'

export const signUpAuth = async({userName,email,password, setLoginError,navigate})=>{
   const auth = getAuth()
   try{
       const response = await createUserWithEmailAndPassword(auth,email,password)
       const user = response.user
       updateProfile(auth.currentUser,{displayName:`${userName}`})
       const createdocs = await createLoginUserDocument(user)
       navigate('/')
   }
   catch(error){
       switch(error.code){
           case 'auth/email-already-in-use':
               console.log("Email Already Exists")
               setLoginError("Email Already Exists")
               break
            }
        console.log(error.code)
   }
}

export const signOutAuth = () => {
    const auth = getAuth()
    signOut(auth)
}   

export const loginAuth = async({email,password,setLoginSuccess,setLoginError,navigate})=>{
    const auth = getAuth()
    try{
        const response = await signInWithEmailAndPassword(auth,email,password)
        setLoginSuccess(true)
        navigate('/')
    }
    catch(error){
        setLoginSuccess(false)
        switch(error.code){
            case 'auth/user-not-found':
                console.log("USER NOT FOUND")
                setLoginError("USER NOT FOUND")
                break
        }
        return false
    }
}

export const GoogleLogin = ({setGoogleLogin})=>{
    const auth = getAuth();
   signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result,"RESULT")
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

  })
}

export const passwordResetMail =async(email)=>{
    const auth = getAuth()
    const response = await sendPasswordResetEmail(auth, email)
}
