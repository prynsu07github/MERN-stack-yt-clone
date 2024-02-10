import React from "react";
import { CheckCircle } from "phosphor-react";

export default function VideoCardContent({ title, description, channel , flexDirection}) {
  return (
    <div style={{ padding: "10px 10px" }}>
      
      <p style={{ fontSize: flexDirection==="row" ?"20px":"15px" }}>{title.substring(0, 100)}</p>
      {flexDirection==="row" && <p style={{fontSize:"18px" , color:"white" , margin:"10px 0"}}>{description}</p>}
      <div
        className="channel-name"
        style={{
          display: "flex",
          gap: "4px",
          opacity: "0.4",
          fontSize: "14px",
          marginTop: "5px"
        }}
      >
        <p style={{fontSize: flexDirection==="row" &&"15px"}} >{channel}</p>
        <CheckCircle size={15} />
      </div>
    </div>
  );
}
