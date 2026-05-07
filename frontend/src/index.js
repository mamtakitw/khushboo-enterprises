import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(

  <BrowserRouter>

    <Routes>

      <Route
        path="/"
        element={<App />}
      />
      
      <Route
        path="/admin"
        element={<Admin />}
      />
      
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

    </Routes>

  </BrowserRouter>

);