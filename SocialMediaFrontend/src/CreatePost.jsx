import React, { useEffect } from "react";
import "../public/CreatePost.css"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import {Image} from "react-bootstrap";
import { PlusCircleDotted } from "react-bootstrap-icons";
import axios from "axios";

function CreatePost()
{
    const [src,setImageSrc] = useState("")
    const [msg,setMsg] = useState("")
    const location = useLocation()
    const profileDetails = location?.state || null

    const [postDetails,setPostDetails] = useState({
        "email":profileDetails.details?.email||"",
        "profile_photo":profileDetails.details?.profile_photo||"",
        "profile_name":profileDetails.details?.profile_name||"",
        "post_photo":"",
        "caption":"",
        "likes":0,
        "comments":[""]
    })
    
    function handlePostImage(event)
    {
        const file = event.target.files[0]
        if(file)
        {
            //console.log(file)
            const imageUrl = `../public/profile/${file.name}`
            console.log(imageUrl)
            setImageSrc(imageUrl)
            setPostDetails((prev)=>{
                return {
                    ...prev,
                    ['post_photo']:imageUrl
                }
            })
        }
    }

    async function handleSubmitPost()
    {
       setPostDetails((prev)=>{
        return {
            ...prev,
            ['caption']:""
        }
       })
       try {
            console.log(postDetails)
            let status = await axios.post("http://localhost:8080/create-post",postDetails)
            if(status.status===200)
            {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                setMsg(status.data)
            }
       } catch (error) {
        //console.log(error)
       }
    }

    return (
        <>
            <div className="main-screen-background">
                        <div className="main-screen-background-section-1">
                        </div>

                        <div className="main-screen-background-section-2-postarea">
                            <div className="post-submission-form" style={{overflow:"scroll"}}>
                                <h4 style={{display:"flex",flexDirection:"row",justifyContent:"center",textShadow:"0px 0px 20px black",color:"white",marginTop:"10px"}}>CREATE POST</h4>
                                {msg.length===0?(<></>):(<p style={{textAlign:"center",color:'lightgreen'}}>{msg}</p>)}
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <div className="image-holder" onClick={()=>{document.getElementById(("image-input")).click()}}>    
                                    {
                                        src.length===0?(<>
                                            <div className="icon-text">
                                                <input type="file" id="image-input" accept="image/*" style={{display:"none"}} onChange={handlePostImage}></input>
                                                <PlusCircleDotted className="add-icon" size={49}></PlusCircleDotted>
                                                <p style={{marginTop:"3px"}}>Add Image</p>
                                            </div>
                                        </>):(<>
                                            <input type="file" id="image-input" accept="image/*" style={{display:"none"}} onChange={handlePostImage}></input>
                                            <Image src={src} style={{width:"100%",height:"100%"}}></Image>
                                        </>)
                                    }
                                    </div>
                                </div>
                                <div style={{color:"white",padding:"10px 10px"}}>
                                      <b>Add Caption:</b>  
                                </div>
                                <div style={{color:"white",padding:"10px 10px", overflow:"scroll"}}>
                                    <textarea name="caption" style={{width:"100%",height:"143px",lineHeight:"normal",resize:"none",fontSize:"18px"}} onChange={(event)=>{setPostDetails((prev)=>{return {...prev,['caption']:event.target.value}})}}></textarea>
                                </div>
                                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",marginBottom:"10px"}}>
                                    <Button onClick={handleSubmitPost}>Submit</Button>
                                </div>
                            </div>
                        </div>

                        <div className="main-screen-background-section-3">
                        </div>
            </div>
        </>
    )
}

export default CreatePost;