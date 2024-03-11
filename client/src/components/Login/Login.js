// Login.js

import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { getBaseURL } from "../apiConfig";

function Login(props) {
  let [uname, setUname] = useState("");
  let [password, setPass] = useState("");

  // adding click handler
  function handleClick() {
    if (uname && password) {
      const user = {
        email: uname,
        password: password,
      };
      let url = `${getBaseURL()}api/users/login`
      axios
        .post(url, { ...user })
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            console.log("Logged in successfully");
            sessionStorage.setItem("isUserAuthenticated", true);
            const user = res.data[0].isAdmin;
            sessionStorage.setItem("customerId", res.data[0].userId);
            sessionStorage.setItem("isAdmin", user ? true : false);
            props.setUserAuthenticatedStatus(user ? true : false, res.data[0].userId)
          } else {
            console.log("User not available");
          }
        })
        .catch((err) => {
          console.log("error");
        });
    } else {
      console.log("Please provide valid data");
    }
  }

  function changeName(event) {
    setUname(event.target.value);
  }

  function changePass(event) {
    setPass(event.target.value);
  }

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <div>
          <label>E-Mail</label>
          <input type="text" value={uname} onChange={changeName}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={changePass}
          ></input>
        </div>
        <button onClick={handleClick}>Login</button>
        <div className="register-link" onClick={() => props.navigateToRegisterPage()}>
          Is New User
        </div>
      </div>
    </>
  );
}

export default Login;
