import React from "react";
import SearchBar from "./SearchBar";
import UserAccount from "./UserAccount";
import { Link } from "react-router-dom";
import Logo from '../utils/assets/Logo.png'

export default function Navbar() {
  return (
    <div
      className="navbar"
      style={{
        height:'10vh',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px",
        // background:
        //   "linear-gradient(108deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%)"
      }}
    >
      <Link to="/" style={{textDecoration:'none' , color:"white"}}>
        <div style={{display:"flex" , alignItems:"center" , gap:"5px"}}>
          <img src={Logo} alt="logo" height={40}/>
        <h1>VideoNex</h1>
        </div>
      </Link>
      <SearchBar />
      <UserAccount />
    </div>
  );
}
