import React, { useState } from "react";
import imageProfile from "../../assets/profile.svg";
import imageNotification from "../../assets/notification.svg";
import imageUnlock from "../../assets/unlock.svg";
import imagelanguageChange from "../../assets/language-change.webp";
import imageModeChange from "../../assets/mode-change.png";
import imagePrivatePolicy from "../../assets/private-policy.jpg";
import imageInformationSite from "../../assets/information-site.webp";
import imageLogOut from "../../assets/logout.svg";
import imageDeleteUser from "../../assets/delete-user.png";
import "./index.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SettingsProfile from "../../components/SettingsProfile";
import SettingsNotification from "../../components/SettingsNotification";
import SettingsPassword from "../../components/SettingsPassword";
import SettingsLanguage from "../../components/SettingsLanguage";
import SettingsTheme from "../../components/SettingsTheme";
import SettingsPrivacy from "../../components/SettingsPrivacy";
import SettingsInformations from "../../components/SettingsInformation";
import { useTranslation } from "react-i18next";
import SettingsDeleteUser from "../../components/SettingsDeleteUser";
import SettingsLogout from "../../components/SettingsLogout";

const UserSettings = () => {
  const { i18n, t } = useTranslation();
  const [activeItem, setActiveItem] = useState("profile");
  const navigate = useNavigate();
  const firstName = window.localStorage.getItem("firstName");

  return (
    <div className="settings_container">
         <aside className="settings_sidebar">
      <nav>
        <ul className="settings_sidebar_list">
          <li
            className={
              activeItem == "profile"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("profile");
              navigate("/user/settings");
            }}
          >
            <img src={imageProfile} alt="imageProfile" width={20} height={20} />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.profile.item1")}
            </p>
          </li>
          <li
            className={
              activeItem == "notification"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("notification");
              navigate("/user/settings/notification");
            }}
          >
            <img
              src={imageNotification}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.notification.item1")}
            </p>
          </li>
          <li
            className={
              activeItem == "change-password"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("change-password");
              navigate("/user/settings/password");
            }}
          >
            <img src={imageUnlock} alt="imageProfile" width={20} height={20} />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.password.item1")}
            </p>
          </li>
          <li
            className={
              activeItem == "change-language"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("change-language");
              navigate("/user/settings/language");
            }}
          >
            <img
              src={imagelanguageChange}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.language.item1")}
            </p>
          </li>
          <li
            className={
              activeItem == "change-theme"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("change-theme");
              navigate("/user/settings/theme");
            }}
          >
            <img
              src={imageModeChange}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.mode.item1")}
            </p>
          </li>
          <li
            className={
              activeItem == "privacy"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("privacy");
              navigate("/user/settings/privacy");
            }}
          >
            <img
              src={imagePrivatePolicy}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.privacy.item1")}
            </p>
          </li>
          <li
            className={
              activeItem == "information"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("information");
              navigate("/user/settings/information");
            }}
          >
            <img
              src={imageInformationSite}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.about.item1")}
            </p>
          </li>

          <li
            className={
              activeItem == "delete-user"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("delete-user");
              navigate("/user/settings/delete-user");
            }}
          >
            <img
              src={imageDeleteUser}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.deleteUser.item1")}
            </p>
          </li>

          <li
            className={
              activeItem == "logout"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => {
              setActiveItem("logout");
              navigate("/user/settings/logout");
            }}
          >
            <img
              src={imageLogOut}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
            {t("settingNavbar.logOut.item1")}
            </p>
          </li>
        </ul>
      </nav>
    </aside>
      {/* <Settings /> */}
      <Routes>
        <Route path="/" element={<SettingsProfile />} />
        <Route path="/notification" element={<SettingsNotification />} />
        <Route path="/password" element={<SettingsPassword />} />
        <Route path="/language" element={<SettingsLanguage />} />
        <Route path="/theme" element={<SettingsTheme />} />
        <Route path="/privacy" element={<SettingsPrivacy />} />
        <Route path="/information" element={<SettingsInformations />} />
        <Route path="/logout" element={<SettingsLogout />} />
        <Route path="/delete-user" element={<SettingsDeleteUser setActiveItem={setActiveItem} />} />
      </Routes>
    </div>
  );
};

export default UserSettings;
