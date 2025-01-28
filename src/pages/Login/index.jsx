import React from "react";
import logo from "../../assets/app_logo_white.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { signInAction } from "../../redux/actions/authActions";

const Login = () => {
  const { i18n, t } = useTranslation();
  const { colors } = useSelector((state) => state.theme);
  const { signInMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const lang = i18n.language
    console.log(signInMessage);

  const signIn = (e) => {
    e.preventDefault();

    const { username, password } = e.target;
    const data = {
        username: username.value,
        password: password.value
    }

    dispatch(signInAction(data, lang));
  };

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
          <div className="title">
            <h2>Welcome to Vibely</h2>
          </div>
          <div className="form">
            <form onSubmit={signIn}>
              <div className="p-2 mt-3">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="username"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="password-input">
                    Password
                  </label>
                  <div className="position-relative auth-pass-inputgroup mb-3">
                    <input
                      name="password"
                      type="password"
                      id="password-input"
                      className="form-control pe-5 password-input"
                      placeholder="password"
                      required
                    />
                  </div>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="auth-remember-check"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="auth-remember-check"
                  >
                    Eslab qolish
                  </label>
                  <a href="#" className="text-muted float-end">
                    Forgot password?
                  </a>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-success login-btn">
                    Kirish
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
