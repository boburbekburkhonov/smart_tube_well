import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_TYPES, signInAction } from "../../redux/actions/authActions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./index.css";

const LoginSignIn = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signInMessage } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.alert);
  const { colors } = useSelector((state) => state.theme);

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

  const clearSignInMessage = () => {
    dispatch({
      type: AUTH_TYPES.SIGN_IN,
      payload: {
        ...signInMessage,
        statusCode: null,
        password: undefined,
      },
    });
  };

  return (
    <>
      {loading ? (
        <div className={colors.layoutBackground == '#1A998E' ? 'spinner-border text-success' : 'spinner-border text-primary'} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="sign_in_title">
            <h2 className="sign_in_title_heading" style={{color: colors.loginHeadingColor}}>{t("loginData.header")}</h2>
          </div>
          <div className="form">
            <form onSubmit={signIn}>
              <div className="p-2 mt-3">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                  {t("settingNavbar.profile.item5")}
                  </label>
                  <input
                    name="username"
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder={t("settingNavbar.profile.item5")}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="password-input">
                  {t("settingNavbar.profile.item12")}
                  </label>
                  <div className="position-relative auth-pass-inputgroup mb-3">
                    <input
                      name="password"
                      type="password"
                      id="password-input"
                      className="form-control pe-5 password-input"
                      placeholder={t("settingNavbar.profile.item12")}
                      required
                    />
                  </div>
                </div>

                {
                  signInMessage.statusCode == 400 ?
                  <div className="login_send_code_error">
                    <h4 className="sign_in_error_heading">{signInMessage.message}</h4>
                  </div>
                : ""
                }

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
                    style={{
                      fontFamily: "Roboto Flex"
                    }}
                  >
                    {t("loginData.remember")}
                  </label>
                  <div
                    onClick={() => {
                      navigate("/forget-password");
                      clearSignInMessage();
                    }}
                    href=""
                    className="text-muted float-end mb-3"
                    style={{
                      fontFamily: "Roboto Flex"
                    }}
                  >
                    {t("loginData.header2")}
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-success login-btn" style={{background: colors.buttonColor}}>
                    {t("loginData.loginButton")}
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
