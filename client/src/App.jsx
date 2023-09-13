import { useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./components/home";
import Login from "./components/login";
import Activate from "./components/activate";
import Signup from "./components/signup";
import ResetPassword from "./components/passwordReset";
import ConfirmPasswordReset from "./components/confirmPasswordReset";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:uid/:token" element={<Activate />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<ConfirmPasswordReset />}
        />
      </Routes>
    </>
  );
}

export default App;
