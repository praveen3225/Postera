import React from "react";
import "../public/ForgotPassword.css"
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { EyeFill,EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function ForgotPassword()
{
    const [valid,setValid] = useState(false)
    const [email,setEmail] = useState("")
    const [msg,setMsg] = useState("")
    const [passwordStates,setPasswordStates] = useState({'passwordState1':true,'passwordState2':true});
    const [passwordmatch,setPasswordMatch] = useState(true)
    const [updateCredentials,setUpdatedCredentials] = useState({"email":"","password":"","confirm_password":""})

    const navigate = useNavigate();

    function handlePasswordState(name)
    {
        setPasswordStates((prev)=>{
            return {
                ...prev,
                [name] : !prev[name]
            }
        })
    }

    function handleUpdateCredentials(event)
    {
        const {name,value} = event.target;
        if(name=='password')
        {
            updateCredentials['password'] = value;
        }
        else
        {
            updateCredentials['confirm_password'] = value;
        }
    }

    function handlePasswordVisiblity(name)
    {
        if(passwordStates[name])
            return "password"
        else    
            return "text"
    }

    function updateEmail(event)
    {
        const {value} = event.target;
        setEmail(value)
    }

    async function verifyEmail()
    {
        try {
            let status = await axios.post("http://localhost:8080/verify-email",{"email":email})
            setValid(true)
            setMsg(status.data)
        } catch (error) {
            setValid(false)
            setMsg(error.response.data)
        }
    }

    async function submitUpdatedCredentials()
    {
        if(updateCredentials['password']!=="" &&
            updateCredentials['confirm_password']!=="" &&
            updateCredentials['password']===updateCredentials['confirm_password']
        )
        {
            setPasswordMatch(true);
            updateCredentials['email']=email
            let status = await axios.patch("http://localhost:8080/update-credentials",updateCredentials)
            setMsg(status.data+" - Redirecting...")
            setTimeout(()=>{
                navigate("/")
            },3000)
        }
        else
        {
            setPasswordMatch(false)
        }
    }

    return (
        <>
            <div className="forgot-password-background">
                <div className="forgot-password-form-position">
                    <div className="forgot-password-form">
                        <h1 style={{textAlign:"center"}}>Change Password</h1>
                        <hr></hr>
                        {!valid ? (<><p style={{color:"red", textAlign:"center"}}>{msg}</p></>):(<></>)}
                        {
                            !valid ? (
                                <>
                                     <div style={{padding:"0px 10px"}}>
                                        <p>Enter your Email:</p>
                                    </div>
                                    <input className="forgot-password-email-field" autoComplete="off" style={{margin:"0px 10px"}} name="email" onChange={updateEmail}></input>
                                    <div style={{display:"flex",justifyContent:"center",marginTop:"15px"}}>
                                        <Button variant="success" onClick={verifyEmail}>submit</Button>
                                    </div>
                                </>
                            ):
                            <>
                            <p style={{color:"lightgreen",textAlign:"center"}}>{msg}</p>
                                <div className="row" style={{position:"relative"}}>
                                    <p className="label">Password :</p>
                                    <div style={{width:"auto",padding:"0px"}}>
                                        <input type={handlePasswordVisiblity("passwordState1")} name="password" onChange={handleUpdateCredentials}></input>
                                        {
                                            passwordStates.passwordState1 ? <EyeSlashFill style={{position:"absolute",left:"85%",top:"24%",cursor:"pointer"}} color="black" onClick={()=>handlePasswordState("passwordState1")}></EyeSlashFill>:<EyeFill name="passwordState1" style={{position:"absolute",left:"85%",top:"24%",cursor:"pointer"}} color="black" onClick={()=>handlePasswordState("passwordState1")}></EyeFill>
                                        }
                                    </div>
                                </div>
                                {passwordmatch ? (<></>):(<><br></br><p style={{color:"red",textAlign:"center",margin:"0px"}}>Passwords do not match</p></>)}
                                <br></br>
                                <div className="row" style={{position:"relative"}}>
                                    <p className="label"> Confirm Password :</p>
                                    <div style={{width:"auto",padding:"0px"}}>
                                        <input type={handlePasswordVisiblity("passwordState2")} name="confirm_password" onChange={handleUpdateCredentials}></input>
                                        {
                                            passwordStates.passwordState2 ? <EyeSlashFill name="passwordState2" style={{position:"absolute",left:"85%",top:"17%",cursor:"pointer"}} onClick={()=>handlePasswordState("passwordState2")} color="black"></EyeSlashFill>:<EyeFill name="passwordState2" style={{position:"absolute",left:"85%",top:"17%",cursor:"pointer"}} onClick={()=>handlePasswordState("passwordState2")} color="black"></EyeFill>
                                        }
                                    </div>
                                </div>
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <Button variant="success" onClick={submitUpdatedCredentials}>submit</Button>
                                </div>
                                
                            </>
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;