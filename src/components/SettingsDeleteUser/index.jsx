import React from "react";
import imageProfile from "../../assets/profile.svg";
import "./index.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SettingsDeleteUser = ({setActiveItem }) => {
  const { userInformationById, updatedUserInformationById } = useSelector(
    (state) => state.dashboard
  );
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  console.log();


  return (
    <main className="settings_right">
      <div className="settings_right_delete_user-page">
        <div className="settings_right_delete_user-container">
          <h1>{t("settingNavbar.deleteUser.item2")}</h1>
          <p>{t("settingNavbar.deleteUser.item3")}</p>

          <div className="settings_right_delete_user-profile" style={{ background: colors.layoutBackground, color: colors.text }}>
            <img
              src={imageProfile}
              alt="imageProfile"
              className="settings_right_delete_user-avatar"
              style={{ filter: "invert(1) brightness(10)" }}
            />
            <div className="settings_right_delete_user-details">
              <h2 style={{color: colors.text }}>
                {" "}
                {userInformationById.firstName + " "}
                {userInformationById.lastName}
              </h2>
              <p className="m-0" style={{color: colors.text }}>{userInformationById.email}</p>
            </div>
          </div>

          <div className="settings_right_delete_user-info">
            <h3 style={{ color: colors.buttonColor }}>{t("settingNavbar.deleteUser.item4")}</h3>
            <ul>
              <li>{t("settingNavbar.deleteUser.item5")}</li>
              <li>{t("settingNavbar.deleteUser.item6")}</li>
              <li>{t("settingNavbar.deleteUser.item7")}</li>
            </ul>
          </div>

          <div className="settings_right_delete_user-info">
            <h3 style={{ color: colors.buttonColor }}>{t("settingNavbar.deleteUser.item8")}</h3>
            <p>
            {t("settingNavbar.deleteUser.item9")}{" "}
              <span
                onClick={() => {
                  setActiveItem('logout')
                  navigate("/user/settings/logout")}}
              className="text-primary cursor_pointer">{t("settingNavbar.deleteUser.item10")}</span> {t("settingNavbar.deleteUser.item11")}
            </p>
          </div>

          <div className="settings_right_delete_user-buttons">
            <button className="settings_right_delete_user-delete">
            {t("settingNavbar.deleteUser.item2")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsDeleteUser;
