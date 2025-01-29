import React, { useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordUser, signInAction, verifySignInAction } from "../../redux/actions/authActions";
import { useTranslation } from "react-i18next";
const LoginVerifyUser = () => {
  const { colors } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { signInMessage, resetPasswordMessage } = useSelector((state) => state.auth);
  const [code, setCode] = useState(["", "", "", ""]);
  const [codeErrorMessage, setCodeErrorMessage] = useState("");
  const dispatch = useDispatch();

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
    const data = {
      username: signInMessage.username,
      code: fullCode,
    };

    if (fullCode.length === 4) {
      dispatch(verifySignInAction(data, lang));
    } else {
      setCodeErrorMessage("Iltimos, barcha raqamlarni kiriting!");
      return false;
    }
  };

  const handleResendCode = () => {
    if(signInMessage?.password != undefined){
      const dataSignIn = {
        username: signInMessage.username,
        password: signInMessage.password,
      };
      dispatch(signInAction(dataSignIn, lang));
    }else {
      const dataResetPassword = {
        username: resetPasswordMessage.username,
      };
      dispatch(resetPasswordUser(dataResetPassword, lang));
    }
  };

  return (
    <div>
      <div className="login_send_code_container">
        <h2 className="login_send_code_title">
          Telefoningizga yuborilgan kodni kiriting
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
        <button className="login_send_code_button" onClick={handleVerifyCode}>
          Tasdiqlash
        </button>
        <div className="d-flex  justify-content-between alice">
          <span className="login_send_code_resend" onClick={handleResendCode}>
            Kodni qayta yuborish
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginVerifyUser;
