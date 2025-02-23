import React from "react";
import "../public/MainScreen.css"
import { useEffect } from "react";
import { useState } from "react";
import { use } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Image } from "react-bootstrap";
import {HouseDoor,HouseDoorFill, PencilFill, Person,PersonFill, PlusCircle,PlusCircleFill, Search} from 'react-bootstrap-icons'
import PosteraCard from "./PosteraCard";
import CreatePost from "./CreatePost";

function MainScreen()
{
    const [profileDetails,setProfileDetails] = useState(null)
    const [searchUserProfileDetails, setSearchUserProfileDeatils] = useState(null)
    const location = useLocation()
    const [isMouseOver,setIsMouseOver] = useState({"home":false,"add":false,"profile":false})
    const [user,setUser] = useState("")
    const [isBioEditable,setIsBioEditable] = useState(false)
    const [updatedBio,setUpdatedBio] = useState([''])
    const [bioString,setBioString] = useState('')
    const [foundUser,setFoundUser] = useState(false)
    const navigate = useNavigate()


    useEffect(()=>{
        const fetchProfileDetails = async()=>{
            if(location.state)
            {
                try {
                    let data =  await axios.get(`http://localhost:8080/get-profile-details/${location.state.email}`)
                    setProfileDetails(data.data)
                    setUpdatedBio(data.data?.bio||"")
                    setBioString(data.data?.bio.join().replaceAll(',','\n'))
                } catch (error) {
                    console.log(error)
                }
            }
            else
            {
                console.log("Error loading")
            }
        }
        fetchProfileDetails();
    },[location.state])

    console.log(profileDetails)

    function handleUserSearch(event)
    {
        const {value} = event.target
        setUser(value) 
    }

    async function handleUserSearchSubmit(event)
    {
        if(event.key==="Enter")
        {
            try {
                let accounts = await axios.get(`http://localhost:8080/fetch-searched-accounts/${user}`)
                console.log(accounts.data)
                const updatedData = accounts.data
                setSearchUserProfileDeatils(updatedData)
                if(accounts.data!=="")
                {
                    setFoundUser(true)
                }
            } catch (error) {
                
            }
        }
    }

    async function handleUserSearchSubmitNavigate()
    {
        navigate(`/profile/${user}`,{state:{"posts":searchUserProfileDetails.posts,"bio":searchUserProfileDetails.bio}})
    }

    function handleBioUpdateStatus()
    {
        setIsBioEditable(true)
    }

    function handleUpdatedBioSubmit() {
        console.log(bioString);
        const updatedBioArray = bioString.split("\n").filter((line) => line.trim() !== "");
        console.log(updatedBioArray);
        
        const updatedProfile = {
            ...profileDetails,
            bio: updatedBioArray,
        };
    
        setProfileDetails(updatedProfile);
    
    
        try {
            axios.patch("http://localhost:8080/update-profile-bio", updatedProfile);
            console.log("success confirmation");
        } catch (error) {
            console.error("Error updating bio:", error);
        }
    
        // Disable bio editing after submitting
        setIsBioEditable(false);
    }
    


    return (
        <>
            {
                profileDetails ?
                (
                    <div className="main-screen-background">
                        <div className="main-screen-background-section-1-profile">
                            <div>
                                <div style={{width:"100%",display:"flex",justifyContent:"center",paddingTop:"10px"}}>
                                    <Image className="profile-photo" title="Add story" src={profileDetails.profile_photo} roundedCircle style={{height:"200px",width:"200px",marginBottom:"20px",boxShadow:"0px 0px 10px black"}}/>
                                </div>
                                <div style={{width:"100%",display:"flex",justifyContent:"center",paddingTop:"10px"}}>
                                    <h3 style={{color:"white",textShadow:"0px 0px 10px black"}}>{profileDetails.profile_name}</h3>
                                </div>
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <hr style={{width:"80%"}}></hr>
                                </div>
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <div className="bio-background" style={{width:"80%"}}>
                                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                                            <h5 style={{color:"white",textShadow:"0px 0px 5px black",marginBottom:"20px"}}>Bio:</h5>
                                            <div style={{cursor:"pointer"}}>
                                                <PencilFill className="bio-edit" color="white" onClick={handleBioUpdateStatus}></PencilFill>
                                            </div>    
                                        </div>
                                        {
                                            isBioEditable ? 
                                            (
                                                <>
                                                <textarea style={{width:"100%",height:"143px",lineHeight:"normal",resize:"none",fontSize:"18px"}} maxLength={50} name="bio" value={bioString} onChange={(event)=>{setBioString(event.target.value)}}></textarea>
                                                <div style={{display:"flex",alignItems:"baseline",justifyContent:"center"}}>
                                                    <Button variant="success" onClick={handleUpdatedBioSubmit}>update</Button>
                                                    <p style={{fontSize:"12px",textAlign:"right",color:"white"}}>{bioString.length}/50</p>
                                                </div>
                                                </>
                                            ):
                                            (
                                                <>
                                                    {
                                                        profileDetails.bio.map((item)=>{
                                                            return <p style={{color:"white",margin:"0px"}}>{item}</p>
                                                        })
                                                    }
                                                </>
                                            )
                                        }    
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{width:"100%",display:"flex",justifyContent:"center",paddingTop:"20px"}}>
                                    <Button variant="outline-warning"> Edit profile</Button>
                                </div>
                            </div>
                        </div>

                        <div className="main-screen-background-section-2-postarea">
                            <div style={{height:"90%",padding:"10px 0px 0px 0px",overflowY:"scroll"}}>
                                <PosteraCard profileDetails={profileDetails} image={"/public/profile/sky.jpeg"}></PosteraCard>
                                <PosteraCard profileDetails={profileDetails} image={"/public/profile/Mountain-4K-Ultra-HD-Wallpaper-3840x2160.jpg"}></PosteraCard>
                                <PosteraCard profileDetails={profileDetails} image={"/public/profile/pexels-matthew-montrone-1324803.jpg"}></PosteraCard>
                                <PosteraCard profileDetails={profileDetails} image={"/public/profile/aesthetic.jpeg"}></PosteraCard>
                            </div>

                            <hr className="nav-row-hr"></hr>

                            <div className="nav-row" style={{ width: "100%", display: "flex", alignItems: "baseline", justifyContent: "space-around" }}>
                                <div className="nav-row-buttons" onMouseOver={()=>{setIsMouseOver((prev)=>{return {...prev,['home']:true}})}} onMouseOut={()=>{setIsMouseOver(false)}}>
                                    {isMouseOver.home ? (
                                        <HouseDoorFill  name="home" size={26}></HouseDoorFill>
                                    ) : (
                                        <HouseDoor  name="home" size={26} ></HouseDoor>
                                    )}
                                </div>
                                <div className="nav-row-buttons" onMouseOver={()=>{setIsMouseOver((prev)=>{return {...prev,['add']:true}})}} onMouseOut={()=>{setIsMouseOver(false)}}>
                                    {isMouseOver.add ? (
                                        <PlusCircleFill  name="add" size={26} onClick={()=>{navigate("/create-post",{state:{"details":profileDetails}})}}></PlusCircleFill>
                                    ) : (
                                        <PlusCircle  name="add" size={26} ></PlusCircle>
                                    )}
                                </div>
                                <div className="nav-row-buttons" onMouseOver={()=>{setIsMouseOver((prev)=>{return {...prev,['profile']:true}})}} onMouseOut={()=>{setIsMouseOver(false)}}>
                                    {isMouseOver.profile ? (
                                        <PersonFill name="profile" size={26} onClick={()=>{navigate(`/profile/${profileDetails.profile_name}`,{state:{"posts":profileDetails.posts,"bio":profileDetails.bio,"profile_photo":profileDetails.profile_photo,"profile_name":profileDetails.profile_name}})}} ></PersonFill>
                                    ) : (
                                        <Person  name="profile" size={26} ></Person>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="main-screen-background-section-3-search">
                            <div className="bio-background" style={{width:"80%"}}>
                                <div className="search-row">
                                    <div style={{marginRight:"10px"}}>
                                        <Search color="white"></Search>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="search" value={user} onChange={handleUserSearch} onKeyDown={handleUserSearchSubmit} style={{color:"rgba(255,255,255"}}></input>
                                    </div>  
                                </div>
                            </div>
                            {
                                foundUser ? (
                                <>
                                <div style={{backgroundColor:"white",width:"80%"}}>
                                    <p style={{padding:"10px"}}>
                                        <a
                                        style={{cursor:"pointer"}}
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            handleUserSearchSubmitNavigate();
                                        }}
                                        >
                                        {user}
                                        </a>
                                    </p>
                                </div>
                                </>):(<></>)
                            }
                            
                        </div>
                    </div>
                )
                :
                (<></>)
            }
        </>
    )
}

export default MainScreen;