import React, { useState } from 'react'
import Logo from './logo'
import { RxCrossCircled } from 'react-icons/rx'
import {BsCheckCircle} from 'react-icons/bs'
import { passwordResetMail } from '../firebase/auth'
import { Link } from 'react-router-dom'

function PasswordReset(){
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid]= useState('')
    const [emailError, setEmailError]= useState('')
    function EmailCheck(){
        if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setEmailValid("Valid Email")
            setEmailError("")
        }
        else{
            console.log("NOPE")
            setEmailError("Enter A Valid Email")
            setEmailValid("")
        }
    }

    async function SubmitCheck(){
        if(email){
            try{
                const response  = await passwordResetMail(email)    
                
            }
            catch(error){
                console.log(error,"HEY")
            }

        }
    }
    return(
        <div className="container-hold">
            <div className="signup-form">
                <form action="/login" method="post">
                    <div className="form-group">
                        <div className="form-item">
                            <Logo/>
                            <h1 className="title" style={{color:"#fff"}}>Password Reset</h1>
                        </div>
                        <div className="form-item">
                            <div className="form-prop" style={emailError?{"border":"1px solid red"}:emailValid? {"border":"1px solid green"}:null}>
                                <input type="email" placeholder="Email" name="email" className="form-control" value={email}  onChange={(e) => setEmail(e.target.value)} onInput={EmailCheck}/>
                                {emailError? <RxCrossCircled className="error" size={27}/> : emailValid? <BsCheckCircle className='valid' size={25}/> : null}
                            </div>
                        </div>
                        <div className="form-item">
                            <a><Link to='/signup'>Already Have An Account?</Link></a>
                        </div>
                        <div className="form-item">
                            <div className="btn">
                                <input type="button" value="Send Link" name="confirm-password" onClick={SubmitCheck}/>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset