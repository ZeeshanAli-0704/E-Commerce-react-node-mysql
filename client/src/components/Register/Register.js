import React, { useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./Register.scss";

function Register(props) {
  let [email, setEmail] = useState("");
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [pass, setPass] = useState("");
  const [isAdmin, setAdmin] = useState("0");

  const handleUserRegisteration = () => {
    const newUser = {
      email: email,
      password: pass,
      isAdmin: isAdmin,
      fname: fname,
      lname: lname,
    };
    if (email !== "" && pass !== "" && fname !== "" && lname !== "") {
      let url = `${getBaseURL()}api/users/register`
      axios
        .post(url, { ...newUser })
        .then((res) => {
          if (res.data != null) {
            console.log("User registered successfully");
            props.navigateToLoginPage();
          }
        })
        .catch((err) => console.log("Sorry unable to add new user"));
    } else {
      console.log("Please fill the required fields");
    }
  };

  const updateAdmin = (adminValue) => {
    console.log(adminValue);
    setAdmin(adminValue);
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <div>
        <label>E-Mail</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Surname</label>
        <input
          type="text"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
      </div>
      <div className="radio-group">
        <input
          type="radio"
          id="customer"
          name="role"
          value="0"
          checked={isAdmin === "0"}
          onChange={() => updateAdmin("0")}
        />
        <label htmlFor="customer">Customer</label>
        <br />
      </div>
      <div className="radio-group">
        <input
          type="radio"
          id="admin"
          name="role"
          value="1"
          checked={isAdmin === "1"}
          onChange={() => updateAdmin("1")}
        />
        <label htmlFor="admin">Admin</label>
        <br />
      </div>
      <div>
        <button onClick={handleUserRegisteration}>Register</button>
      </div>
      <div className="login-link" onClick={() => props.navigateToLoginPage()}>
        Already Logged In User
      </div>
    </div>
  );
}

export default Register;
