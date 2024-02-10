import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";
import fetchFromApi from "../dataFetching";

const ChannelDetail = () => {
  const { channelId } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${channelId}`).then((data) => {
      console.log(data.data.items[0]);
      setChannelDetail(data.data.items[0]);
    });

    fetchFromApi(`search?channelId=${channelId}&part=snippet&order=date`).then(
      (data) => {
        setChannelVideos(data.data.items);
      }
    );
  }, [channelId]);

  return (
    <div className="channel-detail">
      <div className="channel-icon">
        <div>
          <ChannelCard channel={channelDetail} />
        </div>
      </div>
      <div className="channel-videos">
        {channelVideos.map((video) => {
          return (
            <VideoCard
              key={video.id.videoId}
              thumbnail={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
              description={video.snippet.description}
              channel={video.snippet.channelTitle}
              videoId={video.id.videoId}
              flexDirection="column"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChannelDetail;
