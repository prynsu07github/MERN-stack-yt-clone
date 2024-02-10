import React from "react";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const UserAccount = () => {
  const [click, SetClick] = useState(false);

  const navigate = useNavigate()

  function LogOut(){
    localStorage.removeItem("userName")
    location.reload()
  }

  return (
    <div className="user-account">
      <div
        style={{
          cursor: "pointer",
          height: "50px",
          width: "50px",
          borderRadius: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow:"hidden"
        }}
        onClick={() => SetClick(!click)}
      >
        <img
            src={demoProfilePicture}
            alt="profile-pic"
            style={{ height: "100%", width: "100%" }}
          />
      </div>
      <div
        className="account-details"
        style={{ transform: click ? "translateX(0)" : "translateX(500px)" }}
      >
        <div
          className="account-logo"
          style={{
            height: "70px",
            width: "70px",
            borderRadius: "100%",
            alignSelf: "center",
            display: "grid",
            placeContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={demoProfilePicture}
            alt="profile-pic"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <Link to="/history"  onClick={() => SetClick(!click)}>History</Link>
        <Link to="/favourites"  onClick={() => SetClick(!click)}>Favourites</Link>
        <Link to="/account" style={{ width: "100%" }}>
          <button
           onClick={() => SetClick(!click)}
            style={{
              width: "100%",
              padding: "15px 0",
              fontSize: "1rem",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Account Details
          </button>
        </Link>
        <button

            onClick={()=>LogOut()}

          style={{
            width: "100%",
            padding: "15px 0",
            fontSize: "1rem",
            backgroundColor: "White",
            color: "Black",
          }}
          >
            Log Out
          </button>
          <Link to="/about-us"  onClick={() => SetClick(!click)}>About Us</Link>
        <Link to="/contact"  onClick={() => SetClick(!click)}>Contact</Link>
      </div>
    </div>
  );
};

export default UserAccount;
