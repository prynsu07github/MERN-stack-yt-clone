import React from "react";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";

export default function Videos({ Videos }) {
  // console.log(Videos);
  return (
    <div className="video-list">
      {Videos.map((video) => {
        return (
         video.id.videoId?<VideoCard
            key={video.id.videoId}
            thumbnail={video.snippet.thumbnails.medium.url}
            title={video.snippet.title}
            description={video.snippet.description}
            channel={video.snippet.channelTitle}
            videoId ={video.id.videoId}
            flexDirection ="column"
          />:<ChannelCard channel={video}/>
        );
      })}
    </div>
  );
}
