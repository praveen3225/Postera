import React from "react";
import { Circle, Heart, Chat,Send, HeartFill,ChatFill,SendFill } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
import "../public/PosteraCard.css"
import { useState } from "react";

function PosteraCard(props)
{

    const [isToolOperatable,setIsToolOperatable] = useState({
        "like-tool":false,
        "chat-tool":false,
        "send-tool":false,
    })

    //console.log(props)

    return (
        <>
            <div className="postera-card">
                <div className="postera-card-header">
                    <div>
                        <Image className="postera-card-header-profile-photo" src={props.profileDetails.profile_photo} roundedCircle style={{height:"40px",width:"40px",border:"1px solid black",marginRight:"20px"}}/>
                    </div>
                    <div>
                        <h5><b>{props.profileDetails.profile_name}</b></h5>
                    </div>
                </div>
                <hr style={{margin:"0px"}}></hr>
                <div className="postera-card-image">
                   <img src={props.image} style={{height:"100%",width:"100%"}}></img>
                </div>
                <hr style={{margin:"0px"}}></hr>
                <div className="postera-card-tools">
                    <div className="like-tool" style={{marginTop:'3px'}} onMouseOver={()=>{setIsToolOperatable((prev)=>{return {...prev,['like-tool']:true}})}} onMouseOut={()=>{setIsToolOperatable((prev)=>{return {...prev,['like-tool']:false}})}}>
                        {
                            isToolOperatable["like-tool"] ?
                            (<HeartFill  size={28} fill="rgba(255,0,230,1)"></HeartFill>):(<Heart size={28}></Heart>)
                        }
                        
                    </div>
                    <div className="chat-tool" style={{marginTop:'0px'}} onMouseOver={()=>{setIsToolOperatable((prev)=>{return {...prev,['chat-tool']:true}})}} onMouseOut={()=>{setIsToolOperatable((prev)=>{return {...prev,['chat-tool']:false}})}}>
                        {
                            isToolOperatable["chat-tool"] ?
                            (<ChatFill size={28} fill="green"></ChatFill>):(<Chat size={28}></Chat>)
                        }
                        
                    </div>
                    <div className="send-tool" style={{marginTop:'0px'}} onMouseOver={()=>{setIsToolOperatable((prev)=>{return {...prev,['send-tool']:true}})}} onMouseOut={()=>{setIsToolOperatable((prev)=>{return {...prev,['send-tool']:false}})}}>
                        {
                            isToolOperatable['send-tool']?
                            (<SendFill size={28} fill="rgba(0, 191, 255, 0.8)"></SendFill>):(<Send size={28}></Send>)
                        }
                        
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default PosteraCard;