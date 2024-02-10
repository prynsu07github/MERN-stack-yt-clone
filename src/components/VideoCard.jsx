import React, { useState } from "react";
import { Link } from "react-router-dom";
import VideoCardContent from "./VideoCardContent";

export default function VideoCard({
  thumbnail,
  title,
  description,
  channel,
  videoId,
  flexDirection
}) {

  const userName = localStorage.getItem('userName')
  const [IsFavourite , setIsFavourite] = useState(false)

   const handleClick = async(data)=>{
    // console.log(data);
    if(data.userName)
    await fetch("http://localhost:5000/history", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(async response =>{
      var data = await response.json()
     // console.log(data)
      data = JSON.stringify(data.data)
      localStorage.setItem('user history' , data)
    })

  }

  return (
    <div
      className="video-card"
      style={{
        // Wdth: "320px",
        width:flexDirection==="row"?"auto":"320px",
        height:flexDirection==="row"?"180px":"280px",
        // height: "280px",
        overflow: "hidden",
        flexDirection:flexDirection==="row"?"row":"column",
      }}
      onClick={() =>
        handleClick({ userName ,thumbnail, title, description, channel, videoId })
      }
    >
      <Link to={`/video/${videoId}`}>
        <img src={thumbnail} alt="video" className="thumbnail"/>
      </Link>
      <VideoCardContent
        title={title}
        description={description}
        channel={channel}
        flexDirection={flexDirection}
      />
      {/* <div className="heart-icon circle" style={{backgroundColor:IsFavourite?"Red":"grey"}}>
      <div className="heart-icon sqr1" style={{backgroundColor:IsFavourite?"Red":"grey"}}>
      </div>
      <div className="heart-icon sqr2" style={{backgroundColor:IsFavourite?"Red":"grey"}}>
      </div>
      </div> */}
    </div>
  );
}
