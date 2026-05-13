import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://khushboo-backend.onrender.com",
        {
          name,
          email,
          password
        }
        
      );
      localStorage.setItem(
        "token",
       response.data.token
      );
      
      alert("Signup Successful");
      
      navigate("/");

    } catch (error) {

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        if (
          error.response.data.message.includes("already")
        ) {

          alert(
            "User already exists. Please Login."
          );

          navigate("/login");

        } else {

          alert(error.response.data.message);

        }

      } else {

        alert("Signup Failed");

      }

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