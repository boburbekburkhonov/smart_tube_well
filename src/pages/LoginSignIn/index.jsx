import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_TYPES, signInAction } from "../../redux/actions/authActions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LoginSignIn = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signInMessage } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.alert);

  const signIn = (e) => {
    e.preventDefault();

    const { username, password } = e.target;
    const data = {
      username: username.value,
      password: password.value,
    };

    dispatch(signInAction(data, lang));
    username.value = "";
    password.value = "";
  };

  useEffect(() => {
    if (signInMessage.statusCode === 200) {
      navigate(`/login-verify`);
      dispatch({
        type: AUTH_TYPES.SIGN_IN,
        payload: {
          ...signInMessage,
          statusCode: null,
        },
      });
    }
  }, [signInMessage]);

  return (
    <>
      {loading ? (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="sign_in_title">
            <h2>Smart Tube Well dasturiga xush kelibsiz</h2>
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
                  <a
                    onClick={() => navigate("/forget-password")}
                    href=""
                    className="text-muted float-end"
                  >
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
        </>
      )}
    </>
  );
};

export default LoginSignIn;
