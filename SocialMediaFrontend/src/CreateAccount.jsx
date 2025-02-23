import React from "react";
import "../public/CreateAccount.css";
import { EyeFill,EyeSlashFill } from "react-bootstrap-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function CreateAccount()
{
    const [passwordStates,setPasswordStates] = useState({'passwordState1':true,'passwordState2':true});
    const [credentials, setCredentials] = useState({'username':"",'email':"",'password':"",'confirm_password':""})
    const [passwordmatch,setPasswordMatch] = useState(true)
    const [accountCreatedStatus,setAccountCreatedStatus] = useState(false)
    const [nullCheck,setNullCheck] = useState({'userNameAndEmailCheck':true,'passwordCheck':true}) 

    let navigate = useNavigate()
    let isUserNameAndEmailValid = "";
    let isPasswordMatching = "";
    let isPasswordValid = "";

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

    async function printCredentials() {
        console.log("Checking credentials...");
    
        // Initialize all checks as valid
        isUserNameAndEmailValid = !!(credentials['username'] && credentials['email']);
        isPasswordValid = !!(credentials['password'] && credentials['confirm_password']);
        isPasswordMatching = credentials['password'] === credentials['confirm_password'];
    
        // Update state based on validation results
        setNullCheck(prev => ({
            ...prev,
            userNameAndEmailCheck: isUserNameAndEmailValid,
            passwordCheck: isPasswordValid
        }));
    
        setPasswordMatch(isPasswordMatching);

        console.log(isUserNameAndEmailValid,isPasswordValid,isPasswordMatching)
    
        // Log validation results
        if (!isUserNameAndEmailValid) {
            console.log("Error: Username or Email is missing.");
        } 
        if (!isPasswordValid) {
            console.log("Error: Password or Confirm Password is missing.");
        }
        if (isPasswordValid && !isPasswordMatching) {
            console.log("Error: Passwords do not match.");
        }
    
        // If any validation fails, stop execution
        if (!isUserNameAndEmailValid || !isPasswordValid || !isPasswordMatching) {
            return;
        }
    
        // Proceed with API request if all validations pass
        try {
            console.log("Sending credentials:", credentials);
    
            let response = await axios.post("http://localhost:8080/create", credentials);
            console.log("Response status:", response.status);
    
            if (response.status === 200) {
                console.log("Account created successfully.");
                setAccountCreatedStatus(true);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            console.error("Error in API request:", error);
        }
    }
    
    
    function handlePasswordState(name)
    {
        setPasswordStates((prev)=>{
            return {
                ...prev,
                [name] : !prev[name]
            }
        })
    }

    function handlePasswordVisiblity(name)
    {
        if(passwordStates[name])
            return "password"
        else    
            return "text"
    }

    return (
        <>
            <div className="create-account-background">
                <div className="signup-form-position">
                    <div className="signup-form">
                        <h1 style={{textAlign:"center"}}>Create Account</h1>
                        <hr></hr>
                        {accountCreatedStatus ? (<><p style={{color:"lightgreen",textAlign:"center",margin:"0px"}}>Account created successfully - Redirecting...</p><br></br></>):
                        (<>
                        {
                            !nullCheck['userNameAndEmailCheck'] ? (
                            <>
                                <p style={{color:"red",textAlign:"center",margin:"0px"}}>Username or Email cannot be empty</p><br></br>
                            </>):(<></>)
                        }
                        </>)}
                        <div className="row">
                            <p className="label">Username : </p>
                            <input name="username" onChange={updateCredentials} autoComplete="off"></input>
                        </div>
                        <br></br>
                        <div className="row">
                            <p className="label">Email : </p>
                            <input name="email" onChange={updateCredentials} autoComplete="off"></input>
                        </div>
                        <br></br>
                        <div className="row" style={{position:"relative"}}>
                            <p className="label">Password :</p>
                            <div style={{width:"auto",padding:"0px"}}>
                                <input type={handlePasswordVisiblity("passwordState1")} name="password" onChange={updateCredentials}></input>
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
                                <input type={handlePasswordVisiblity("passwordState2")} name="confirm_password" onChange={updateCredentials}></input>
                                {
                                    passwordStates.passwordState2 ? <EyeSlashFill name="passwordState2" style={{position:"absolute",left:"85%",top:"17%",cursor:"pointer"}} onClick={()=>handlePasswordState("passwordState2")} color="black"></EyeSlashFill>:<EyeFill name="passwordState2" style={{position:"absolute",left:"85%",top:"17%",cursor:"pointer"}} onClick={()=>handlePasswordState("passwordState2")} color="black"></EyeFill>
                                }
                            </div>
                        </div>
                        <div style={{display:"flex",justifyContent:"center"}}>
                            <Button variant="success" onClick={printCredentials} >create</Button>
                        </div>

                        <div style={{display:"flex",justifyContent:"center",padding:"15px 0px"}}>
                            <Button variant="danger" style={{width:"71.74px"}} onClick={()=>{navigate("/")}}>back</Button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default CreateAccount;
