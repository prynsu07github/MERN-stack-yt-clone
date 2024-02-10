import React from "react";
import { useState , useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Auth from "../Auth/RegistrationAuth";

export default function RegistrationPage() {
  const [errMsg, setErrMsg] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  var hasNumber = /\d/;

  useEffect(()=>{
    setTimeout(()=>setErrMsg("") , 2000)
  } , [errMsg])

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    const credentials = {userName , password}

    const Authentication =  Auth(credentials)
    console.log(Authentication)
      setErrMsg(Authentication.errMsg)
      if(!Authentication.isError)
     
      await fetch("http://localhost:5000/register", {
          method: "post",
          body: JSON.stringify({ fname, lname, email, userName, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async(result) =>{
          result = await result.json()
          console.log(result)
          setErrMsg(result.msg)
          if(result.isUserRegister)
          setTimeout(()=>{navigate('/login')},1000)
        })
  };

  return (
    <div className="container">
      <div className="log-in-page registration-page">
        <h1>videoNex</h1>
        <form onSubmit={handleOnSubmit} method="post">
         <div  className="user-names">
        <div>
        <label htmlFor="fname">First Name</label>
          <input
            type="text"
            name="fname"
            id="fname"
            // autoComplete="off"
            autoFocus="on"
            required
            value={fname}
            onChange={(e) => setFirstName(e.target.value.trim())}
          />
        </div>
         <div>
         <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            name="lname"
            id="lname"
            // autoComplete="off"
            required
            value={lname}
            onChange={(e) => setLastName(e.target.value.trim())}
          />
         </div>
         </div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="Email"
            id="Email"
            // autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <label htmlFor="username" id="user-name">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            // autoComplete="off"
            required
            value={userName}
            maxLength={8}
            onChange={(e) => setUserName(e.target.value.trim())}
          />
          <label htmlFor="password" id="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            // autoComplete="off"
            required
            value={password}
            maxLength={8}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <button type="submit" id="login-btn">
            Register
          </button>
        </form>
        <a href="/login" style={{ textDecoration: "none", color: "#fff" }}>
          Already have account? Log in
        </a>
        <p className="err-msg" style={{transform:errMsg===""?'translateY(-100px)':'translateY(0px)' , backgroundColor:errMsg==='Done'?'green':'rgb(255, 0, 0)'}}>{errMsg}</p>
      </div>
    </div>
  );
}
