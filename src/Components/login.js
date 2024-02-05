import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import Logo from "./logo"
import { useEffect, useState,useContext } from "react"
import {BsCheckCircle} from "react-icons/bs"
import {RxCrossCircled} from "react-icons/rx"
import { loginAuth } from '../firebase/auth'
import PreLoader from './preloader'
import {FcGoogle} from 'react-icons/fc'
import { GoogleLogin } from '../firebase/auth'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../firebase/userProvider';

function Login(){
    const authcx = useContext(UserContext);


    const navigate = useNavigate()

    const[userLogged, setUserLogged] = useState(false) 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [emailValid, setEmailValid] = useState('')
    const [loginError, setLoginError]= useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordValid, setPasswordValid] = useState('')
    const[loginSuccess, setLoginSuccess] = useState(false)
    const[googleLogin, setGoogleLogin] = useState(false)


    function EmailCheck(){
        console.log("SSS")
        if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            console.log("YEAH")
            setEmailValid("Valid Email")
            setEmailError("")
        }
        else{
            console.log("NOPE")
            setEmailError("Enter A Valid Email")
            setEmailValid("")
        }
    }
    
    function PasswordCheck(){
        if(password.length < 7){
            setPasswordError("Password Should Contain Atleast 7 Characters")
            setPasswordValid("")
        }
        else{
            setPasswordError("")
            setPasswordValid("Valid Password")
        }
    }

    async function SubmitCheck(){
        if(email && password){
            try{
                setUserLogged(true)
                const SignInProcess = await loginAuth({email,password, setLoginSuccess, setLoginError,navigate})
                if(loginSuccess){
                    navigate('/')
                }
                else{
                    setUserLogged(false)
                }
            }
            catch(error){
                console.log(error,"HEY")
                setUserLogged(false)
            }

        }
    }

    async function LoginWithGoogle(){
        try{
            const googleSignIn= await GoogleLogin({setGoogleLogin})
            .then(()=>{
                navigate('/')
            })
        }
        catch(error){
            console.log("User Login Failed",error)
        }
    }



    if(userLogged){
        return <PreLoader/>
    }

    else{

        return(
        <div className="container-hold">
            <div className="signup-form">
                <form action="/login" method="post">
                    <div className="form-group">
                        <div className="form-item">
                            <Logo/>
                            <h1 className="title" style={{color:"#fff"}}>Login</h1>
                        </div>
                        <div className="form-item">
                            <div className="form-prop" style={emailError?{"border":"1px solid red"}:emailValid? {"border":"1px solid green"}:null}>
                                <input type="email" placeholder="Email" name="email" className="form-control" value={email}  onChange={(e) => setEmail(e.target.value)} onInput={EmailCheck}/>
                                {emailError? <RxCrossCircled className="error" size={27}/> : emailValid? <BsCheckCircle className='valid' size={25}/> : null}
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="form-prop" style={passwordError?{"border":"1px solid red"}:passwordValid? {"border":"1px solid green"}:null}>
                                <input type="password" placeholder="Password" name="create-password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)} onInput={PasswordCheck} />
                                {passwordError? <RxCrossCircled className="error" size={25}/> : passwordValid? <BsCheckCircle className='valid' size={25}/> : null}
                            </div>
                        </div>
                        <div>
                                {loginError && <p className="error">{loginError}</p>}
                        </div>
                        <div className="form-item">
                            <a><Link to='/signup'>Don't Have An Account? Signup</Link></a>
                        </div>
                        <div className="form-item">
                            <div className="btn">
                                <input type="button" value="Login" name="confirm-password" onClick={SubmitCheck}/>
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="google-prop" onClick={LoginWithGoogle}>
                                <FcGoogle size={23} className='google-logo'/>
                               <p>Login In With Google</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      
    )
    }
}

export default Login