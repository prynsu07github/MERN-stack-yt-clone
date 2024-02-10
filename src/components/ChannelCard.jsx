import React from "react";
import {Link} from 'react-router-dom'
import { CheckCircle } from "phosphor-react";

const ChannelCard = ({channel} ) => {
  console.log(channel)
  return (
    <div className="channel-card">
      <div className="channel-logo">
        <Link to={`/channel/${channel?.id?.channelId}`}>
          <img src={channel?.snippet?.thumbnails?.high?.url} alt="channel-logo" />
        </Link>
      </div>
      <p style={{marginTop:"10px" , fontSize:'1.5rem' , fontWeight:'bold' , display:'flex' , alignItems:"center" , gap:"2px"}}>{channel?.snippet?.channelTitle || channel?.snippet?.title}<CheckCircle size={25} /></p>
    </div>
  );
};

export default ChannelCard;
