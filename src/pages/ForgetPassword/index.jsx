import React, { useEffect } from "react";
import { AUTH_TYPES, resetPasswordUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { i18n, t } = useTranslation();
  const { resetPasswordMessage } = useSelector((state) => state.auth);
  const lang = i18n.language;
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
      <div className="sign_in_title">
        <h2>Parolni tiklash uchun usernamemingizni kiriting</h2>
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

            <div className="mt-4">
              <button type="submit" className="btn btn-success login-btn">
                Parolni tiklash
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
