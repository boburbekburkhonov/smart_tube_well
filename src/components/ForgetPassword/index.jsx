import React, { useEffect } from "react";
import { AUTH_TYPES, resetPasswordUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ForgetPassword = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { resetPasswordMessage } = useSelector((state) => state.auth);
  const { colors } = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.alert);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetPassword = (e) => {
    e.preventDefault();

    const { username } = e.target;
    const data = {
      username: username.value,
    };

    dispatch(resetPasswordUser(data, lang));
    username.value = "";
  };

  useEffect(() => {
    if (resetPasswordMessage.statusCode === 200) {
      navigate(`/login-verify`);
      dispatch({
        type: AUTH_TYPES.RESET_PASSWORD,
        payload: {
          ...resetPasswordMessage,
          statusCode: null,
        },
      });
    }
  }, [resetPasswordMessage]);

  return (
    <>
      {loading ? (
        <div className={colors.layoutBackground == '#1A998E' ? 'spinner-border text-success' : 'spinner-border text-primary'} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="sign_in_title">
            <h3 className="text-center">
              <i className="fa fa-lock fa-4x"></i>
            </h3>
            <h2
              className="forget_password_heading"
              style={{ color: colors.loginHeadingColor }}
            >
              {" "}
              {t("loginData.headerResetPassword")}
            </h2>
          </div>
          <div className="form">
            <form onSubmit={resetPassword}>
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

                {resetPasswordMessage.statusCode == 400 ? (
                  <div className="login_send_code_error">
                    <h4 className="sign_in_error_heading">
                      {resetPasswordMessage.message}
                    </h4>
                  </div>
                ) : (
                  ""
                )}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-success login-btn"
                    style={{ background: colors.buttonColor }}
                  >
                    {t("loginData.headerResetPasswordButton")}
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

export default ForgetPassword;
