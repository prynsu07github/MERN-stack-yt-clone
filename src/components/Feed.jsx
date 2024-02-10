import React from "react";
import fetchFromApi from "../dataFetching";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import VideosList from "./VideosList";
export default function Feed() {
  const [Videos, setVideos] = useState([]);
  const [SelectedItem, setSelectedItem] = useState("All");

  useEffect(() => {
    fetchFromApi(`search?part=snippet&q=${SelectedItem}`).then((data) => {
      setVideos(data.data.items);
      console.log(Videos);
    });
  }, [SelectedItem]);

  return (
    <div className="feed">
      <SideBar SelectedItem={SelectedItem} setSelectedItem={setSelectedItem} />
      <div>
        {/* <h1 style={{ textAlign: "center", margin: "10px 0 15px 0" }}>
          {SelectedItem} <span style={{ color: "#00d4ff" }}>Videos</span>
        </h1> */}
        <VideosList Videos={Videos} />
      </div>
    </div>
  );
}
