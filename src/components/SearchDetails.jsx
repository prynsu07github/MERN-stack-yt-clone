import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import fetchFromApi from "../dataFetching";
import VideosList from './VideosList'

const SearchDetails = () => {

    const { searchTerm } = useParams();
  console.log(searchTerm)
  const [Videos, SetVideos] = useState([]);


  useEffect(()=>{
    fetchFromApi(`search?part=snippet&q=${searchTerm}`).then((data)=>{
     console.log(data)
     SetVideos(data.data.items);
    })
  },[searchTerm])

  return (
    <div>
        <div className="feed">
      <div>
        <h1 style={{ textAlign: "center", margin: "10px 0 15px 0" }}>
        {searchTerm}  <span style={{ color: "#00d4ff" }}>Videos</span>
        </h1>
        <VideosList Videos={Videos} />
      </div>
    </div>
    </div>
  )
}

export default SearchDetails