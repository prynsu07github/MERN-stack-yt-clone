import React, { useEffect, useState } from "react";
import { ArrowDown, Plus } from "phosphor-react";
import "./Admin.css";

const Admin = () => {
  const [showUserInfo, SetShowUserInfo] = useState(false);
  const [showAddUserPanel, setShowAddUserPanel] = useState(false);

  const [userDetails, setUserDetails] = useState([]);

  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [contentEditable, setContentEditable] = useState(false);

  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedFname, setUpdatedFname] = useState("");
  const [updatedLname, setUpdatedLname] = useState("");

  useEffect(() => {
    getUsersData();
  }, []);

  async function getUsersData() {
    await fetch("http://localhost:5000/get-users-data").then(async (result) => {
      result = await result.json();
      // console.log(result);
      setUserDetails(result);
    });
  }

  async function deleteUser(username) {
    await fetch("http://localhost:5000/delete-user", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(fname, lname, email, userName, password);
    await fetch("http://localhost:5000/add-user", {
      method: "post",
      body: JSON.stringify({ fname, lname, email, userName, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // .then(async (result) => {
    //   result = await result.json();
    //   console.log(result);
    //   if (result.isUserRegister)
    //   setShowAddUserPanel(!showAddUserPanel);
    // });
  }

  async function updateUser() {
    setContentEditable(!contentEditable);
    console.log(updatedEmail);
  }

  return (
    <div className="admin-panel">
      <h1>videoNex Admin Panel</h1>
      <div>
        <div className="sidebar">
          <button onClick={() => getUsersData()}>User Details</button>
          <button>Issues</button>
        </div>
        <div className="main-window">
          <div className="button-container">
            <button
              className="action-button"
              onClick={() => setShowAddUserPanel(!showAddUserPanel)}
            >
              Add +{" "}
            </button>
          </div>
          <div>
            {userDetails.map((user, indx) => {
              return (
                <div className="user-info">
                  <div onClick={() => SetShowUserInfo(!showUserInfo)}>
                    <div style={{ display: "flex" }}>
                      <p
                        style={{
                          padding: "10px",
                          outline: contentEditable ? "2px solid black" : "none",
                        }}
                        contentEditable={contentEditable}
                        onChange={(e) => setUpdatedFname(e.target.value)}
                      >
                        {user.fname}
                      </p>
                      <p
                        style={{
                          padding: "10px",
                          outline: contentEditable ? "2px solid black" : "none",
                        }}
                        contentEditable={contentEditable}
                        onChange={(e) => setUpdatedLname(e.target.value)}
                      >
                        {user.lname}
                      </p>
                    </div>
                    <ArrowDown
                      size={32}
                      style={{
                        transform: showUserInfo
                          ? "rotate(180deg)"
                          : "rotate(0)",
                        transition: ".3s ease",
                      }}
                    />
                  </div>
                  <div
                    className="personal-info"
                    style={{ display: showUserInfo ? "Inline" : "none" }}
                  >
                    <div>
                      <div>
                        <p>Email</p>
                        <p>Username</p>
                        <p>Password</p>
                      </div>
                      <div className="database-info">
                        <p
                          contentEditable={contentEditable}
                          style={{
                            outline: contentEditable
                              ? "2px solid black"
                              : "none",
                          }}
                          onChange={(e) => setUpdatedEmail(e.target.value)}
                        >
                          {user.email}
                        </p>
                        <p>{user.userName}</p>
                        <p>{user.password}</p>
                      </div>
                      <div className="buttons">
                        <button
                          className="action-button"
                          onClick={() => deleteUser(user.userName)}
                        >
                          Delete
                        </button>
                        <button
                          className="action-button"
                          onClick={() =>
                            contentEditable
                              ? updateUser()
                              : setContentEditable(!contentEditable)
                          }
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="add-user"
            style={{ display: showAddUserPanel ? "inline" : "none" }}
          >
            <form method="post">
              <label for="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                onChange={(e) => setFirstName(e.target.value.trim())}
              ></input>

              <label for="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                onChange={(e) => setLastName(e.target.value.trim())}
              ></input>

              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value.trim())}
              ></input>

              <label for="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                onChange={(e) => setUserName(e.target.value.trim())}
                maxLength={8}
              ></input>

              <label for="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value.trim())}
                maxLength={8}
              ></input>

              <button onClick={(e) => handleSubmit(e)}>ADD USER</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
