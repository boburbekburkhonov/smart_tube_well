import React, { useState } from "react";
import logo from "../../assets/app_logo_white.png";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import LoginVerifyUser from "../../components/LoginVerifyUser";
import LoginSignIn from "../../components/LoginSignIn";
import ForgetPassword from "../../components/ForgetPassword";
import ChangePassword from "../../components/ChangePassword";
import { useSelector } from "react-redux";

const Login = () => {
  const { colors } = useSelector((state) => state.theme);

  return (
    <section className="login" style={{background: colors.layoutBackground}}>
      <div className="content">
        <div className="left">
          <img
            src={logo}
            alt="logo"
            style={{ filter: "invert(1) brightness(10)" }}
          />
          <h1>Smart Tube Well</h1>
        </div>

        <div className="right">
          <Routes>
            <Route path="/" element={<LoginSignIn />} />
            <Route path="/login-verify" element={<LoginVerifyUser />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Login;
