import React from "react";
import imageProfile from "../../assets/profile.svg";
import "./index.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SettingsLogout = () => {
  const { userInformationById, updatedUserInformationById } = useSelector(
    (state) => state.dashboard
  );
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <main className="settings_right">
      <div class="settings_right-page">
        <div class="settings_right-container">
          <h1>{t("settingNavbar.logOut.item1")}</h1>
          <p>{t("settingNavbar.logOut.item2")}</p>

          <div
            class="settings_right-profile"
            style={{ background: colors.layoutBackground, color: colors.text }}
          >
            <img
              src={imageProfile}
              alt="imageProfile"
              class="imageProfile"
              width={50}
              height={50}
              style={{ filter: "invert(1) brightness(10)" }}
            />
            <div class="settings_right-details ms-2">
              <h2>
                {userInformationById.firstName + " "}
                {userInformationById.lastName}
              </h2>
              <p>{userInformationById.email}</p>
            </div>
          </div>

          <div class="settings_right-info">
            <h3 style={{ color: colors.buttonColor }}>{t("settingNavbar.logOut.item3")}</h3>
            <ul>
              <li>{t("settingNavbar.logOut.item4")}</li>
              <li>{t("settingNavbar.logOut.item5")}</li>
              <li>{t("settingNavbar.logOut.item6")}</li>
            </ul>
          </div>

          <div class="settings_right-info">
            <h3 style={{ color: colors.buttonColor }}>
            {t("settingNavbar.logOut.item7")}
            </h3>
            <p>
            {t("settingNavbar.logOut.item8")}
            </p>
          </div>

          <div class="settings_right-buttons">
            <button class="settings_right-logout">{t("settingNavbar.logOut.item1")}</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsLogout;
