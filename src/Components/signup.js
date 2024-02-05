import Logo from "./logo"
import { Link } from "react-router-dom"
import FormProp from "./MiniComps/formprop"
import { useState } from "react"
import {signUpAuth } from "../firebase/auth"
import PreLoader from "./preloader"
import { useNavigate } from "react-router-dom"

function Signup(){
    const navigate = useNavigate()

    const[userName,setUsername]= useState('')

    const[email,setEmail]= useState('')
    const[emailValid, setEmailValid] = useState(false)
    const[emailError, setEmailError] = useState(false)

    const[password,setPassword]= useState('')
    const[passwordValid,setPasswordValid]= useState(false)
    const[passwordError,setPasswordError]= useState(false)
    
    const[confirmPass,setConfirmPass]= useState('')
    const[confirmValid,setconfirmValid]= useState(false)
    const[confirmError,setconfirmError]= useState(false)

    const[userLogged, setUserLogged] = useState(false)
    const[loginError, setLoginError] = useState('')

    function EmailCheck(){
        console.log(email)
        if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            console.log("YEAH")
            setEmailValid(true)
            setEmailError(false)
        }
        else{
            console.log("NOPE")
            setEmailError(true)
            setEmailValid(false)
        }
    }

        
    function PasswordCheck(){
        if(password.length < 7){
            setPasswordError("Minimum Of 8 Characters")
            setPasswordValid(false)
        }
        else{
            setPasswordError(false)
            setPasswordValid(true)
        }
    }

    function ConfirmPassword(){
        if(confirmPass === password){
            console.log("OKAY")
            setconfirmValid(true)
            setconfirmError(false)
        }
        else{
            setconfirmError(true)
            setconfirmValid(false)
        }
    }

    function Submit(){
        if(emailValid && passwordValid && confirmValid && userName){
            console.log("YEP")
            console.log(userName)
            // setUserLogged(true)
            try{
                const userSignup=signUpAuth({userName,email,password,setLoginError,navigate})
            }
            catch(error){
                console.log("TTT")
            }
        }
        else{
            console.log("Nope")
        }
    }

    if(userLogged){
        return<PreLoader/>
    }

    else{

        return(
            <div className="container-hold">
            <div className="signup-form">
                <form action="" method="post">
                    <div className="form-group">
                        <div className="form-item">
                            <Logo/>
                            <h1 className="title" style={{color:"#fff", fontSize:"25px"}}>Sign Up</h1>
                        </div>
                        
                        <FormProp placeholder="User Name" type="text" setting={setUsername}/>
                        <FormProp placeholder="Email Address" onChange={EmailCheck} type="email"  setting={setEmail} error={emailError} valid={emailValid} />
                        <FormProp placeholder="Create Password" onChange={PasswordCheck} type="password" setting={setPassword} error={passwordError} valid={passwordValid}/>
                        <FormProp placeholder="Confirm Password" onChange={ConfirmPassword}  type="password" setting={setConfirmPass} error={confirmError} valid={confirmValid}/>
    
                        <div>
                            {loginError && <p className="error">{loginError}</p>}
                        </div>
                        <div className="form-item">
                            <a>Already Have An Account?<Link to='/login'> Login</Link></a>
                        </div>
                        <div className="form-item">
                            <div className="btn">
                                <input type="button" value="Sign Up" name="confirm-password" onClick={Submit} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        )
    }

}

export default Signup