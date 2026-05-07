import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "http:///khushboo-enterprises-production.up.railway.app/api/auth/signup",

        {
          name,
          email,
          password
        }

      );

      alert("Signup Successful");

      navigate("/login");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSignup}
      >

        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Signup
        </button>

      </form>

    </div>

  );

}

export default Signup;