import React from "react";
import imageProfile from "../../assets/profile.svg";
import imageAlertDelete from "../../assets/alert-delete.png";
import "./index.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SettingsDeleteUser = ({ setActiveItem }) => {
  const { userInformationById } = useSelector(
    (state) => state.dashboard
  );
  const { colors, theme } = useSelector((state) => state.theme);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userId");
  const role = window.localStorage.getItem("role");

  const deleteUserFunc = async () => {
    try {
      const data = {
        id: userId,
      };

      const res = await postDataApi(`users/delete?lang=${lang}`, data);

      if (res.data.statusCode === 200) {
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("firstName");
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        window.localStorage.removeItem("regionId");
        window.localStorage.removeItem("districtId");
        window.localStorage.removeItem("userId");
        window.location.href = "/";
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
      {/* MODAL */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header w-100">
              <img
                className="m-auto"
                width={90}
                height={90}
                src={imageAlertDelete}
                alt="imageAlertDelete"
              />
            </div>
            <div className="modal-body">
              <p className="m-0">
              {t("settingNavbar.deleteUser.item12")}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t("settingNavbar.deleteUser.item13")}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteUserFunc()}
              >
                {t("settingNavbar.deleteUser.item14")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings_right_delete_user-page">
        <div className="settings_right_delete_user-container">
          <h1>{t("settingNavbar.deleteUser.item2")}</h1>
          <p>{t("settingNavbar.deleteUser.item3")}</p>

          <div
            className="settings_right_delete_user-profile"
            style={{ background: colors.layoutBackground, color: colors.text }}
          >
            <img
              src={imageProfile}
              alt="imageProfile"
              className="settings_right_delete_user-avatar"
              style={{ filter: "invert(1) brightness(10)" }}
            />
            <div className="settings_right_delete_user-details">
              <h2 style={{ color: colors.text }}>
                {" "}
                {userInformationById.firstName + " "}
                {userInformationById.lastName}
              </h2>
              <p className="m-0" style={{ color: colors.text }}>
                {userInformationById.email}
              </p>
            </div>
          </div>

          <div className="settings_right_delete_user-info">
            <h3 style={{ color: colors.buttonColor }}>
              {t("settingNavbar.deleteUser.item4")}
            </h3>
            <ul>
              <li>{t("settingNavbar.deleteUser.item5")}</li>
              <li>{t("settingNavbar.deleteUser.item6")}</li>
              <li>{t("settingNavbar.deleteUser.item7")}</li>
            </ul>
          </div>

          <div className="settings_right_delete_user-info">
            <h3 style={{ color: colors.buttonColor }}>
              {t("settingNavbar.deleteUser.item8")}
            </h3>
            <p>
              {t("settingNavbar.deleteUser.item9")}{" "}
              <span
                onClick={() => {
                  setActiveItem("logout");
                  navigate(`/${role}/settings/logout`);
                }}
                className="text-primary cursor_pointer"
              >
                {t("settingNavbar.deleteUser.item10")}
              </span>{" "}
              {t("settingNavbar.deleteUser.item11")}
            </p>
          </div>

          <div className="settings_right_delete_user-buttons">
            <button
              className="settings_right_delete_user-delete"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              {t("settingNavbar.deleteUser.item2")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsDeleteUser;
