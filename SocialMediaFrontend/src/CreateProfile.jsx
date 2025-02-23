import React, { useEffect, useState } from "react";
import '../public/CreateProfile.css';
import { useLocation } from "react-router-dom";
import axios from "axios";
import {Button} from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";


function CreateProfile() {
    const location = useLocation();
    const [] = useState(null)
    const [msg,setMsg]=useState("")
    const [accountDetails, setAccountDetails] = useState(null);
    const [profileDetails, setProfileDetails] = useState({
        "email":"",
        "profile_name":"",
        "dob":"",
        "gender":"",
        "phone_number":"",
        "location":"",
        "portfolio":"",
        "profile_photo":"/profile_pic.png",
        "bio":[""],
    })

    let navigate = useNavigate();

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const incomingCredentials = location.state || null;
                if (incomingCredentials && incomingCredentials.email) {
                    const response = await axios.get(`http://localhost:8080/get-account-details/${incomingCredentials.email}`);
                    setAccountDetails(response.data); 
                } else {
                    console.log("No credentials found in state.");
                }
            } catch (error) {
                console.error("Error fetching account details:", error);
            }
        };
        fetchAccountDetails(); 
    }, [location.state]); 

    function handleProfilePhoto(event)
    {
        const file = event.target.files[0]
        if(file)
        {
            console.log(file)
            const imageUrl = `../public/profile/${file.name}`
            console.log(imageUrl)
            setProfileDetails((prev)=>{
                return {
                    ...prev,
                    ['profile_photo']:imageUrl
                }
            })
        }
    }

    function handleProfileDetails(event) {
        const { name, value } = event.target;
        if (name === "bio") {
            const bioArray = value.split('\n').filter(line => line.trim() !== "");
            setProfileDetails((prev) => ({
                ...prev,
                [name]: bioArray
            }));
        } else {
            setProfileDetails((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }
    
    async function handleSubmit()
    {
        try {
            profileDetails.email = accountDetails.email
            let status = await axios.post("http://localhost:8080/create-profile",profileDetails)
            if(status.status===200)
            {
                axios.patch("http://localhost:8080/update-profile-creation-status",accountDetails)
            }
            setMsg(status.data+", Redirecting...")
            const credentials = {"email":accountDetails.email,"password":accountDetails.password}
            console.log(credentials)
            console.log("Everything worked perfect")
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setTimeout(() => {
                navigate("/home", {state:credentials});
            }, 3000);   
        } catch (error) {
            console.log("work aagala da loosu payalae")
            console.log(error.response.data)
        }
    }

    return (
        <>
            <div className="create-profile-background">
                <div className="create-profile-header">
                    <h1 style={{fontSize:"66px",textShadow:"0px 0px 10px black"}}>Hello {accountDetails?.username||"User"},</h1>
                </div>
                <div className="create-profile-sub-text">
                    <h2 style={{fontSize:"36px",textShadow:"0px 0px 10px black",textAlign:"center"}}>Welcome to your new Postera space</h2>
                </div>                
                <div className="create-profile-sub-text2">
                    <p style={{fontSize:"24px",textAlign:"center"}}>To get started, please fill in your profile details. This is a one-time process that will help us personalize your experience.</p>
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <hr style={{width:"90%"}}></hr>
                </div>
                <div className="create-profile-form-position" style={{paddingBottom:"20px"}}>
                    <div className="create-profile-form">
                        <p style={{color:"lightgreen",textAlign:"center"}}>{msg}</p>
                        <div className="create-profile-form-row">
                            <div className="create-profile-form-row-col-1" style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                                <div style={{display:"flex",alignItems:"baseline"}}>
                                    <p style={{width:"147.91px"}}>Username : </p>
                                    <input style={{margin:"0px 10px",backgroundColor:"rgba(255,255,255,0.5)",color:"black"}} value={accountDetails?.username||"guest"} disabled></input>
                                </div>
                                <div style={{display:"flex",alignItems:"baseline"}}>
                                    <p style={{width:"147.91px"}}>E-mail : </p>
                                    <input style={{margin:"0px 10px",backgroundColor:"rgba(255,255,255,0.5)",color:"black"}} value={accountDetails?.email||"guest"} disabled></input>
                                </div>
                                <div style={{display:"flex",alignItems:"baseline"}}>
                                    <p>Profile-Name :</p>
                                    <input style={{margin:"0px 10px"}} name="profile_name" onChange={handleProfileDetails}></input>
                                </div>
                                <div style={{display:"flex",alignItems:"baseline"}}>
                                    <p style={{width:"147.91px"}}>Date of Birth :</p>
                                    <input style={{margin:"0px 10px"}} type="date" name="dob" onChange={handleProfileDetails}></input>
                                </div>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"baseline"}}>
                                    <p style={{width:"147.91px"}}>Gender :</p>
                                    <div style={{display:"flex",width:"100%",justifyContent:"space-between",paddingRight:"10px"}}>
                                        <div style={{display:"flex",alignItems:"baseline"}}>
                                            <input name="gender" className="radio-input" type="radio" value="Male" onChange={handleProfileDetails}></input>
                                            <p style={{fontSize:"18px"}}>Male</p>
                                        </div>
                                        <div style={{display:"flex",alignItems:"baseline"}}>
                                            <input name="gender" className="radio-input" type="radio" value="Female" onChange={handleProfileDetails}></input>
                                            <p style={{fontSize:"18px"}}>Female</p>
                                        </div>
                                        <div style={{display:"flex",alignItems:"baseline"}}>
                                            <input name="gender" className="radio-input" type="radio" value="Prefer not to say" onChange={handleProfileDetails}></input>
                                            <p style={{fontSize:"18px"}}>Prefer not to say</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display:"flex",alignItems:"baseline"}}>
                                    <p style={{width:"147.91px"}}>Phone No. :</p>
                                    <input style={{ margin: "0px 10px" }}  onChange={handleProfileDetails} type="text" name="phone_number" inputMode="numeric" maxLength={12} onInput={(e) => {e.target.value = e.target.value.replace(/[^0-9-]/g, '').slice(0, 12);}}/>
                                </div>
                                <div style={{display:"flex",alignItems:"baseline"}}>
                                    <p style={{width:"147.91px"}}>Location :</p>
                                    <input style={{margin:"0px 10px"}} onChange={handleProfileDetails} type="text" name="location"></input>
                                </div>
                                <div style={{display:"flex",alignItems:"baseline"}}>
                                    <p style={{width:"147.91px"}}>Portfolio :</p>
                                    <input style={{margin:"0px 10px"}} onChange={handleProfileDetails} type="text" name="portfolio"></input>
                                </div>
                            </div>
                            
                            <div className="create-profile-form-row-col-2" style={{width:"392.91px",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
                                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <div style={{width:"100%",display:"flex"}}>
                                        <p style={{width:"147.91px"}}>Profile Photo :</p>
                                    </div>
                                    <Image src={profileDetails['profile_photo']} roundedCircle style={{height:"170px",width:"170px",marginBottom:"20px",boxShadow:"0px 0px 10px black"}}/>
                                    <input type="file" accept="image/*" onChange={handleProfilePhoto} id="file-input" style={{ display: "none" }}></input>
                                    <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
                                        <Button variant="success" onClick={()=>{document.getElementById("file-input").click()}} > upload</Button>
                                    </div>
                                </div>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"baseline",marginTop:"50px",width:"100%"}}>
                                    <p style={{width:"147.91px"}}>Bio :</p>
                                    <div style={{width:"100%"}}>
                                        <textarea style={{width:"100%",height:"143px",lineHeight:"normal",resize:"none",fontSize:"18px"}} maxLength={50} name="bio" onChange={handleProfileDetails}></textarea>
                                        <div>
                                            <p style={{fontSize:"12px",textAlign:"right"}}>{profileDetails.bio.join().length}/50</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"10px"}}>
                            <Button variant="success" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProfile;
