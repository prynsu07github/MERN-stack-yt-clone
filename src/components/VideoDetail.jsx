import { useState, useEffect } from "react";
import { useParams , Link} from "react-router-dom";
import fetchFromApi from "../dataFetching";
import ReactPlayer from "react-player";
import { CheckCircle } from "phosphor-react";
import VideoCard from "./VideoCard";

export default function VideoDetail() {
  const { videoId } = useParams();
  // console.log(videoId)
  const [Video, SetVideo] = useState([]);
  const [relatedVideos, SetRelatedVideos] = useState([]);
  useEffect(() => {
    fetchFromApi(`videos?part=snippet&id=${videoId}`).then((data) => {
      // console.log(data.data.items[0])
      SetVideo(data.data.items[0]);
    });

    fetchFromApi(`search?part=snippet&relatedToVideoId=${videoId}&type=video`).then(data =>{
      SetRelatedVideos(data.data.items)
    })

  }, [videoId]);

  // const {snippet:{channelTitle} , statistics :{viewCount , likeCount}} = Video

  return (
    <div className="video-details">
      <div className="video" >
       <div>
       <ReactPlayer
          url={`https://youtube.com/watch?v=${videoId}`}
          controls
          height="100%"
          width="100%"
          light
        ></ReactPlayer>
       </div>
        <p style={{ fontSize:"1.5rem" }}>{Video?.snippet?.localized?.title}</p>
        <Link to={`/channel/${Video?.snippet?.channelId}`}>
          <p>{Video?.snippet?.channelTitle} <CheckCircle size={14} /></p>
          </Link>
      </div>
      <div className="suggested-videos" >
        <p style={{fontWeight:"bold" , fontSize:"1.5rem"}}>
        Suggested videos
        </p>
        <div>
        {relatedVideos.map((video) => {
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
    </div>
  );
}
