import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import logo from "../../assets/app_logo_white.png";
import "./index.css";
import { postDataApi } from "../../utils/refreshDataApi";
import { useTranslation } from "react-i18next";

const UserInformationNotification = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const { allNotifications } = useSelector((state) => state.dashboard);
  const [notification, setNotification] = useState([]);
  const theme = window.localStorage.getItem("theme");

  useEffect(() => {
    const findNotification = allNotifications?.filter((e) => e.id == id);

    setNotification(findNotification);

    postDataApi(`notifications/updateIsRead?lang=${lang}`, {
      notificationId: id,
    }).then((data) => data);
  }, [id, allNotifications]);

  const fixDate = (time) => {
    const fixedTime = new Date(time);
    fixedTime.setHours(fixedTime.getHours() - 5);

    const date = `${fixedTime.getDate()}.${
      fixedTime.getMonth() + 1
    }.${fixedTime.getFullYear()} `

    const timeDate = `${fixedTime.getHours()}:${
      String(fixedTime.getMinutes()).length == 1
        ? "0" + fixedTime.getMinutes()
        : fixedTime.getMinutes()
    }`;

    return {
      date: date,
      time: timeDate
    };
  };

  return (
    <div className="user_info_notif_wrapper d-flex justify-content-center align-items-center flex-column h-100">
      {notification.length != 0 ? (
        <>
          <div className="notification_information_container">
            <div className="notification_information_card">
              <div className="notification_information_icon-box">
                <img
                  src={logo}
                  alt="logo"
                  className="notification_information_icon"
                  width={222}
                  height={222}
                />
              </div>
              <div className="notification_information_info">
                <h2 className="mb-4 d-flex align-items-center justify-content-center">
                  <span className="fs-2">💧</span>
                  {t("settingNavbar.notification.item9")}
                </h2>

                <div class="status-box mb-4">
                    <p className="m-0 fw-bold">Status: <span class="status warning">
                    <span className="fs-3">
                    ⚠️
                    </span>
                    {t("settingNavbar.notification.item10")}</span></p>
                </div>

                <h2 className="notification_information_title d-flex align-items-center mb-4">
                  Title:{" "}
                  <p className="m-0 fw-normal ms-2">
                    Lorem ipsum dolor, sit amet consectetur.{" "}
                    {notification[0].id}
                  </p>
                </h2>
                <h2 className="notification_information_message d-flex align-items-center mb-4">
                  Message:{" "}
                  <p className="m-0 fw-normal ms-2">
                    Lorem ipsum dolor sit amet consectetur adipisici ng elit.
                    Earum incidunt cumque voluptatibus!
                  </p>
                </h2>
                <p className="notification_information_time">
                  📅 {fixDate(notification[0].createdAt).date} | 🕒 {fixDate(notification[0].createdAt).time}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={
            theme == "light"
              ? "spinner-border text-success"
              : "spinner-border text-primary"
          }
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      )}
    </div>
  );
};

export default UserInformationNotification;
