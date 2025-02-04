import React, { useState } from "react";
import imageProfile from "../../assets/profile.svg";
import imageNotification from "../../assets/notification.svg";
import imageUnlock from "../../assets/unlock.svg";
import imagelanguageChange from "../../assets/language-change.webp";
import imageModeChange from "../../assets/mode-change.png";
import imagePrivatePolicy from "../../assets/private-policy.jpg";
import imageInformationSite from "../../assets/information-site.webp";
import "./index.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("profile");
  const firstName = window.localStorage.getItem("firstName");

  return (
    <aside className="settings_sidebar">
      <nav>
        <ul className="settings_sidebar_list">
          <li
            className={
              activeItem == "profile"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => setActiveItem("profile")}
          >
            <img src={imageProfile} alt="imageProfile" width={20} height={20} />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
              Shaxsiy kabinet
            </p>
          </li>
          <li
            className={
              activeItem == "notification"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => setActiveItem("notification")}
          >
            <img
              src={imageNotification}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
              Bildirishnoma
            </p>
          </li>
          <li
            className={
              activeItem == "change-password"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => setActiveItem("change-password")}
          >
            <img src={imageUnlock} alt="imageProfile" width={20} height={20} />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
              Parolni o'zgartirish
            </p>
          </li>
          <li
            className={
              activeItem == "change-language"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => setActiveItem("change-language")}
          >
            <img
              src={imagelanguageChange}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
              Tilni o'zgartirish
            </p>
          </li>
          <li
            className={
              activeItem == "change-theme"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => setActiveItem("change-theme")}
          >
            <img
              src={imageModeChange}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
              Rejimni o'zgartirish
            </p>
          </li>
          <li
            className={
              activeItem == "privacy"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => setActiveItem("privacy")}
          >
            <img
              src={imagePrivatePolicy}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
              Maxfiylik siyosati
            </p>
          </li>
          <li
            className={
              activeItem == "information"
                ? "settings_sidebar_item d-flex align-items-center p-2 active_sidebar"
                : "settings_sidebar_item d-flex align-items-center p-2"
            }
            onClick={() => setActiveItem("information")}
          >
            <img
              src={imageInformationSite}
              alt="imageProfile"
              width={20}
              height={20}
            />

            <p className="m-0 settings_sidebar_item_desc ms-1 p-2">
              Dastur haqida ma'lumot
            </p>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const Settings = () => {
  return (
    <main className="settings">
      <h2>Your Settings</h2>
      <div className="settings-content">
        <div className="profile-pic">
          <img src="avatar.jpg" alt="User Avatar" />
        </div>
        <form>
          <label>Your name:</label>
          <input type="text" defaultValue="John Doe" />
          <label>Your e-mail:</label>
          <input type="email" defaultValue="johndoe@gmail.com" />
          <label>Your e-mail for notifications:</label>
          <input type="email" defaultValue="johndoe@gmail.com" />
          <button type="submit" className="save-btn">
            Save
          </button>
        </form>
      </div>
    </main>
  );
};
const UserSettings = () => {
  return (
    <div className="settings_container">
      <Sidebar />
      <Settings />
    </div>
  );
};

export default UserSettings;
