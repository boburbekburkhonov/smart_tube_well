import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AUTH_TYPES,
  resetPasswordUser,
  signInAction,
  verifyResetPasswordUser,
  verifySignInAction,
} from "../../redux/actions/authActions";
import { useTranslation } from "react-i18next";
const LoginVerifyUser = () => {
  const { colors } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { signInMessage, resetPasswordMessage, verifyResetPasswordMessage } =
    useSelector((state) => state.auth);
  const [code, setCode] = useState(["", "", "", ""]);
  const [codeErrorMessage, setCodeErrorMessage] = useState("");
  const [remainingTime, setRemainingTime] = useState(60); // 60 soniyadan boshlanadi
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event, index) => {
    const value = event.target.value;

    // Faqat raqamlar kiritilsin
    if (/[^0-9]/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Agar raqam kiritilgan bo'lsa, keyingi inputga o'tish
    if (value !== "" && index < 3) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    }
  };

  const handleVerifyCode = () => {
    const fullCode = code.join("");

    if (fullCode.length === 4) {
      if (signInMessage?.password != undefined) {
        const data = {
          username: signInMessage.username,
          code: fullCode,
        };
        dispatch(verifySignInAction(data, lang));
      } else {
        const data = {
          username: resetPasswordMessage.username,
          code: fullCode,
        };
        dispatch(verifyResetPasswordUser(data, lang));
      }
    } else {
      setCodeErrorMessage("Iltimos, barcha raqamlarni kiriting!");
      return false;
    }
  };

  const handleResendCode = () => {
    if (signInMessage?.password != undefined) {
      const dataSignIn = {
        username: signInMessage.username,
        password: signInMessage.password,
      };
      dispatch(signInAction(dataSignIn, lang));
    } else {
      const dataResetPassword = {
        username: resetPasswordMessage.username,
      };
      dispatch(resetPasswordUser(dataResetPassword, lang));
    }
  };

  useEffect(() => {
    let timer;
    if (isActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer); // Tozalash
  }, [isActive, remainingTime]);

  const startTimer = () => {
    setRemainingTime(60);
    setIsActive(true); // Har safar qayta bosilganda 60 soniyadan boshlanadi
  };

  useEffect(() => {
    if (verifyResetPasswordMessage.statusCode === 200) {
      navigate(`/change-password`);
      dispatch({
        type: AUTH_TYPES.VERIFY_RESET_PASSWORD,
        payload: {
          ...verifyResetPasswordMessage,
          statusCode: null,
        },
      });
    }
  }, [verifyResetPasswordMessage]);

  return (
    <div>
      <div className="login_send_code_container">
        <h2 className="login_send_code_title">
          {t("loginData.headerVerifyUser")}
        </h2>
        <div className="login_send_code_input_group">
          {code.map((value, index) => (
            <input
              className="login_send_code_input"
              key={index}
              id={`input-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(event) => handleInputChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              autoFocus={index === 0}
            />
          ))}
        </div>
        <div className="login_send_code_error">
          <h4 className="login_send_code_error_heading">{codeErrorMessage}</h4>
        </div>

        <div className="timer-container mt-2">
          <p className="time-display">{`${t(
            "loginData.timeLimitVerifyUser"
          )}: ${remainingTime}`}</p>
        </div>

        <button className="login_send_code_button" onClick={handleVerifyCode}>
          {t("loginData.timeLimitVerifyUserButton")}
        </button>
        <div className="d-flex  justify-content-between alice">
          <span
            className="login_send_code_resend"
            onClick={() => {
              handleResendCode();
              startTimer();
            }}
          >
            {t("loginData.sendCodeMessageAgain")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginVerifyUser;
