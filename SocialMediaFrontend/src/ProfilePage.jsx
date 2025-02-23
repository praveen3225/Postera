import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Image } from "react-bootstrap";
import "../public/ProfilePage.css";
import ProfilePost from "./profilePost";


function ProfilePage()
{
    const location = useLocation()
    const data = location?.state || null;

    return (
        <>
            <div className="profile-page-bg">
                <div className="profile-info-section">
                    <div className="profile-pic">
                        <Image title="Add story" src={data.profile_photo} roundedCircle style={{height:"180px",width:"180px",margin:"10px 0px 0px 10px",boxShadow:"0px 0px 10px black"}}/>
                    </div>
                    <div className="profile-info">
                        <h3>{data.profile_name}</h3>
                        <hr style={{margin:"0px"}}></hr>
                        <br></br>
                        {
                            data.bio.map((line)=>{
                                return <p style={{textShadow:"none",lineHeight:"9px"}}>{line}</p>
                            })
                        }
                    </div>
                </div>
                <div className="profile-post-section">
                        {
                            data.posts.map((post)=>{
                                return <ProfilePost data={post}></ProfilePost>
                            })
                        }
                </div>

            </div>

            
                {/* {data.posts.map((post, index) => (
                    <div key={index}>
                        <p><strong>Profile Name:</strong> {post.profile_name}</p>
                        <p><strong>Caption:</strong> {post.caption}</p>
                        <p><strong>Likes:</strong> {post.likes}</p>
                        <img src={post.post_photo} alt="Post" width="200px" />
                        
                        <h4>Comments:</h4>
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment, cIndex) => (
                                <p key={cIndex}>{comment}</p>
                            ))
                        ) : (
                            <p>No comments</p>
                        )}
                    </div>
                ))} */}
            
        </>
    )
}

export default ProfilePage;