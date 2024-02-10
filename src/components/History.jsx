import React, { useState , useEffect } from 'react'
import VideoCard from './VideoCard'
import {Trash} from "phosphor-react"

const History = () => {
  
  const HistoryData = JSON.parse(localStorage.getItem('user history'))
  const [historyData , setHistoryData] = useState(HistoryData)

  async function deleteHistory(videoDetail){
   // console.log(id)
await fetch("http://localhost:5000/delete-history" , {
  method: "POST",
  body: JSON.stringify(videoDetail),
  headers: {
    "Content-Type": "application/json",
  },
}).then(async (result) => {
  result = await result.json();
  console.log(result.history);
  localStorage.setItem('user history' , JSON.stringify(result.history))
  setHistoryData(result.history)
})
  }

  //console.log(historyData)
  return (
    <div className='history_list'>
      {
        historyData.map(history =>{
          return(
            <div key={history.videoId} style={{backgroundColor:"rgb(90, 71, 108)" , borderRadius:"20px" , display:'flex' , alignItems:"center" , paddingRight:"10px"}}>
              <VideoCard
            key={history.videoId}
            thumbnail={history.thumbnail}
            title={history.title}
            description={history.description}
            channel={history.channel}
            videoId ={history.videoId}
            flexDirection="row"
            />
            <Trash size={32} onClick={()=>deleteHistory(history)} />
            </div>
          )
        })
      }
        <h2>Your History</h2>
    </div>
  )
}

export default History