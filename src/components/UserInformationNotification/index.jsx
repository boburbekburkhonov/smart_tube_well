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
  const { getAllNotifications } = useSelector((state) => state.notification);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const findNotification = getAllNotifications.data?.filter(
      (e) => e.id == id
    );

    setNotification(findNotification);

    postDataApi(`notifications/updateIsRead?lang=${lang}`, {
      notificationId: id,
    })
    .then(data => console.log(data)
    )
  }, []);


  return (
    <div className="user_info_notif_wrapper d-flex justify-content-center align-items-center flex-column h-100">
      <div className="text-center">
        <img src={logo} alt="logo" width={180} height={180} />
      </div>

      <div className="w-100">
        <h2 className="user_info_notif_title m-auto mt-4 d-flex">
          Title:{" "}
          <p className="fw-normal m-0 ms-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing.{" "}
            {notification[0]?.id}
          </p>
        </h2>

        <h2 className="user_info_notif_title m-auto mt-4 d-flex">
          Message:{" "}
          <p className="fw-normal m-0 ms-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            incidunt cumque voluptatibus!
          </p>
        </h2>

        <h2 className="user_info_notif_title  m-auto mt-4 d-flex align-items-center">
          Time: <p className="fw-normal m-0 ms-1">26.1.2025 18:26</p>
        </h2>
      </div>
    </div>
  );
};

export default UserInformationNotification;
