import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http:///khushboo-enterprises-production.up.railway.app/api/auth/login",

        {
          email,
          password
        }

      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleLogin}
      >

        <h2>Login</h2>

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
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;