import React from "react";
import imageProfile from "../../assets/profile.svg";
import "./index.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { postDataApi } from "../../utils/refreshDataApi";

const SettingsLogout = () => {
  const { userInformationById } = useSelector(
    (state) => state.dashboard
  );
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const logOut = async () => {
    try {
      const res = await postDataApi(`auth/logout?lang=${lang}`);

      if (res.data.statusCode === 200) {
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("firstName");
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        window.localStorage.removeItem("regionId");
        window.localStorage.removeItem("districtId");
        window.localStorage.removeItem("userId");
        window.location.href = '/';
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

  return (
    <main className="settings_right">
      <div className="settings_right-page">
        <div className="settings_right-container">
          <h1>{t("settingNavbar.logOut.item1")}</h1>
          <p>{t("settingNavbar.logOut.item2")}</p>

          <div
            className="settings_right-profile"
            style={{ background: colors.layoutBackground, color: colors.text }}
          >
            <img
              src={imageProfile}
              alt="imageProfile"
              className="imageProfile"
              width={50}
              height={50}
              style={{ filter: "invert(1) brightness(10)" }}
            />
            <div className="settings_right-details ms-2">
              <h2>
                {userInformationById.firstName + " "}
                {userInformationById.lastName}
              </h2>
              <p>{userInformationById.email}</p>
            </div>
          </div>

          <div className="settings_right-info">
            <h3 style={{ color: colors.buttonColor }}>
              {t("settingNavbar.logOut.item3")}
            </h3>
            <ul>
              <li>{t("settingNavbar.logOut.item4")}</li>
              <li>{t("settingNavbar.logOut.item5")}</li>
              <li>{t("settingNavbar.logOut.item6")}</li>
            </ul>
          </div>

          <div className="settings_right-info">
            <h3 style={{ color: colors.buttonColor }}>
              {t("settingNavbar.logOut.item7")}
            </h3>
            <p>{t("settingNavbar.logOut.item8")}</p>
          </div>

          <div className="settings_right-buttons">
            <button className="settings_right-logout" onClick={() => logOut()}>
              {t("settingNavbar.logOut.item1")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsLogout;
