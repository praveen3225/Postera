import React from "react";
import '../public/Login.css'
import { useNavigate } from "react-router-dom";
import { EyeFill,EyeSlashFill } from "react-bootstrap-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";


function Login()
{
    const [passwordState,setPasswordState] = useState(true);
    const [credentials, setCredentials] = useState({'email':"",'password':""})
    const [error,setError] = useState(" ")
    let navigate = useNavigate();

    function updateCredentials(event)
    {
        const {name,value} = event.target;
        setCredentials((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    async function submitCredentials()
    {
        try {
            let status = await axios.post("http://localhost:8080/validate",credentials)
            console.log("'success")
            setError("")
            setTimeout(()=>{
                status.data==="profile created already" ? navigate("/home",{state:credentials}):navigate("/create-profile",{state:credentials})
            },3000)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                setError(error.response.data);
            } else if (error.request) {
                console.log("Server is not responding. Please try again later.");
                setError("Server is not responding. Please try again later.");
            } else {
                console.log("An unexpected error occurred.");
                setError("An unexpected error occurred.");
            }
        }
    }

    function createAccountPage()
    {
        navigate("/create-account")
    }

    function forgotPasswordPage()
    {
        navigate("/forgot-password")
    }

    function handlePasswordState()
    {
        setPasswordState(!passwordState)
    }

    function handlePasswordVisiblity()
    {
        if(passwordState)
            return "password"
        else    
            return "text"
    }

    return (
        <>
            <div className="login-background">
                <div className="app-name-placement">
                    <h1 className="app-name">POSTERA</h1>
                </div>
                <div className="app-motto-placement">
                    <h3 className="app-motto">Share Connect and Inspire</h3>
                </div>
                <div className="app-description-placement">
                    <p className="app-description">Postera is a dynamic social media platform where users can share posts, engage with content, and connect with a like-minded community. Whether it's text, images, or videos, Postera makes sharing seamless and interactive. </p>
                </div>
                <div className="login-placement">
                    <div className="login-form">
                        <h4 style={{textAlign:"center",margin:"0px",paddingTop:"16px"}}>Login</h4>
                        <hr style={{color:"black"}}></hr>
                        {
                            error.length===0 ? (<p style={{color:"green",textAlign:"center",padding:"0px 5px"}}>Logged in successfully</p>):(<p style={{color:"red",textAlign:"center",padding:"0px 5px"}}>{error}</p>)
                        }
                        <div className="login-form-fields">
                            <div className="row">
                                <p className="label"><b>Email :</b></p>
                                <input className="input" name="email" onChange={updateCredentials} autoComplete="off" ></input>
                            </div>
                            <br></br>
                            <div className="row">
                                <p className="label"><b>Password :</b></p>
                                <div style={{position:"relative"}}>
                                    <input className="input password" name="password" onChange={updateCredentials} type={handlePasswordVisiblity()}></input>
                                    {
                                        passwordState ? <EyeSlashFill style={{position:"absolute",left:"57%",top:"30%",cursor:"pointer"}} onClick={handlePasswordState}></EyeSlashFill>:<EyeFill style={{position:"absolute",left:"57%",top:"30%",cursor:"pointer"}} onClick={handlePasswordState}></EyeFill>
                                    }
                                </div>
                            </div>
                            <div className="additional-row" style={{paddingTop:"10px"}}>
                                <p>Forgotten your - <b className="signup" style={{cursor:'pointer'}} onClick={forgotPasswordPage}>Password</b></p>
                            </div>
                            <div className="additional-row">
                                <p>Dont have an account - <b className="signup" style={{cursor:'pointer'}} onClick={createAccountPage}>Sign up</b></p>
                            </div>
                            <div className="row">
                                <Button variant="success" 
                                        style={{width:"auto",margin:"10px 0px"}}
                                        onClick={submitCredentials}>
                                            submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;