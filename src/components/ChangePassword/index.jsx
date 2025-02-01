import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  AUTH_TYPES,
  changePasswordUser,
} from "../../redux/actions/authActions";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { resetPasswordMessage, changeMessage } = useSelector(
    (state) => state.auth
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.theme);

  const resetPassword = (e) => {
    e.preventDefault();

    const { newPassword, newPasswordAgain } = e.target;
    if (newPassword.value == newPasswordAgain.value) {
      const data = {
        username: resetPasswordMessage.username,
        password: newPassword.value,
      };
      dispatch(changePasswordUser(data, lang));
    } else {
      setErrorMessage(t("loginData.errorConfirmationNewPassword"));
    }
  };

  useEffect(() => {
    if (changeMessage.statusCode == 200) {
      setIsSuccess(false);
      dispatch({
        type: AUTH_TYPES.CHANGE_PASSWORD,
        payload: {
          ...changeMessage,
          statusCode: null,
        },
      });
    }
  }, [changeMessage]);

  return (
    <>
      {isSuccess ? (
        <>
          <div className="sign_in_title">
            <h3 className="text-center">
              <i className="fa fa-lock fa-3x"></i>
            </h3>

            <h2 className="fs-3 m-0"> {t("loginData.newPasswordHeading")}</h2>
          </div>
          <div className="form" onSubmit={resetPassword}>
            <form>
              <div className="p-2 mt-1">
                <div className="mb-3">
                  <label
                    htmlFor="new-password"
                    className="new-password-label mb-2"
                  >
                    {t("loginData.newPassword")}
                  </label>
                  <input
                    name="newPassword"
                    type="password"
                    id="new-password"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    className="new-password-again-label mb-2"
                    htmlFor="new-password-again"
                  >
                    {t("loginData.confirmationNewPassword")}
                  </label>
                  <div className="position-relative auth-pass-inputgroup mb-3">
                    <input
                      name="newPasswordAgain"
                      type="password"
                      id="new-password-again"
                      className="form-control pe-5 password-input"
                      required
                    />
                  </div>
                </div>

                <div className="login_send_code_error login_send_code_error_change_password">
                  <h4 className="login_send_code_error_heading">
                    {errorMessage}
                  </h4>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-success login-btn"
                    style={{ background: colors.layoutBackground }}
                  >
                    {t("loginData.changePasswordButton")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <CheckCircleOutlined
              style={{
                fontSize: "80px",
                color: colors.layoutBackground,
              }}
            />
            <h2 className="mt-3 mb-3 fs-4">
              {t("loginData.passwordChangedSuccessfully")}
            </h2>
            <button
              onClick={() => navigate(`/`)}
              className="btn btn-success login-btn"
              style={{ background: colors.layoutBackground }}
            >
              {t("loginData.loginButton")}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ChangePassword;
