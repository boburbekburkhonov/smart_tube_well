import React, { useState } from "react";
import logo from "../../assets/app_logo_white.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  signInAction,
  verifySignInAction,
} from "../../redux/actions/authActions";
import { Route, Routes } from "react-router-dom";
import LoginVerifyUser from "../LoginVerifyUser";
import LoginSignIn from "../LoginSignIn";
import ForgetPassword from "../ForgetPassword";

const Login = () => {

  return (
    <section className="login">
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
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Login;
