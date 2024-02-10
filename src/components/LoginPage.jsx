import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../Auth/RegistrationAuth";
import LoginIcon from "../utils/assets/LoginIcon.png";
import { Eye } from "phosphor-react";
import EyeGif from "../utils/assets/eye.gif";
import Sleep from "../utils/assets/sleep.gif";

export default function LoginPage() {
  const [errMsg, setErrMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [whoIsLogin, setWhoIsLogin] = useState("user");

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setErrMsg(""), 2000);
  }, [errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      userName,
      password,
    };

    const Authentication = Auth(credentials);
    console.log(Authentication);
    setErrMsg(Authentication.errMsg);
    if (!Authentication.isError)
      await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ userName, password , whoIsLogin}),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (result) => {
        result = await result.json();
        console.log(result);
        setErrMsg(result.msg);
        if (result.isUserLogin) {
          if(whoIsLogin==="user"){
            localStorage.setItem("userName", userName);
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 200);
          }
          else{
            setTimeout(() => {
              navigate("/admin");
              window.location.reload();
            }, 200);
          }
        }
      });
  };

  return (
    <div className="container">
      <div className="log-in-page">
        {/* <h1>videoNex</h1> */}
        <div style={{ textAlign: "center", width: "100%" }}>
          <img src={LoginIcon} alt="" height="100px" />
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="username" id="user-name">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            autoFocus="on"
            required
            onChange={(e) => setUserName(e.target.value)}
            maxLength={8}
          />
          <label htmlFor="password" id="password">
            Password
          </label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              type={!showPassword ? "password" : "text"}
              name="password"
              id="password"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
              maxLength={8}
            />
            {/* <Eye size={25} /> */}
            <img
              src={!showPassword ? Sleep : EyeGif}
              alt=""
              height="40px"
              className="show-pass"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div style={{display:"flex" , gap:"18px"}}>
          <div style={{width:"50px",cursor:"pointer" ,padding:"10px" , background:"transparent" , color:"white" , backgroundColor:whoIsLogin==="user"?"#352f44":"transparent"}} onClick={()=>setWhoIsLogin("user")}>User</div>
          <div style={{width:"50px" ,cursor:"pointer" ,padding:"10px" , background:"transparent" , color:"white" , backgroundColor:whoIsLogin==="admin"?"#352f44":"transparent"}} onClick={()=>setWhoIsLogin("admin")}>Admin</div>
          </div>
          <button type="submit" id="login-btn">
            Log In
          </button>
        </form>
        <a href="/register" style={{ textDecoration: "none", color: "#fff" }}>
          Don't have account? Sign Up
        </a>
        <p
          className="err-msg"
          style={{
            transform: errMsg === "" ? "translateY(-100px)" : "translateY(0px)",
            backgroundColor:
              errMsg === "Login Successfully!" ? "green" : "rgb(255, 0, 0)",
          }}
        >
          {errMsg}
        </p>
      </div>
    </div>
  );
}
