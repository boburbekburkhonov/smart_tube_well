import React, { useEffect, useState } from "react";
import "./index.css";
import { findAllNotifications } from "../../redux/actions/notification";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import messageRead from '../../assets/email-read.png'
import messageNotRead from '../../assets/email-not-read.png'
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

const UserNotifications = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const { getAllNotifications } = useSelector((state) => state.notification);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(findAllNotifications(lang, pageData));
  }, [pageData]);

  const fixDate = time => {
    const fixedTime = new Date(time)
    fixedTime.setHours(fixedTime.getHours() - 5);

    const date = `${fixedTime.getDate()}.${
      fixedTime.getMonth() + 1
    }.${fixedTime.getFullYear()} ${fixedTime.getHours()}:${
      String(fixedTime.getMinutes()).length == 1
        ? "0" + fixedTime.getMinutes()
        : fixedTime.getMinutes()
    }`;

    return date
  }

  return (
    <section className="home-section">
      <div className="home-section-notification-wrapper">
        <div className="card-notification w-100">
          <div className="card-body p-0">
            <h2 className="mb-4">{t("layoutData.navLink6")}</h2>

            <ul className="m-0 p-0 list-unstyled notification-wrapper mb-3">
              <li className="d-flex align-items-center justify-content-between notification-wrapper-item-first">
                <p className="m-0 fw-bold">
                {t("settingNavbar.notification.item7")} {`(${getAllNotifications.totalDocuments})`}
                </p>
                <p className="m-0 fw-bold">{t("settingNavbar.notification.item8")}</p>
              </li>
              {getAllNotifications.data?.map((e, i) => {
                return (
                    <li
                      className="notification-wrapper-item d-flex align-items-center justify-content-between cursor-pointer"
                      key={i}
                      onClick={() => navigate(`/user/notifications/${e.id}`)}
                    >
                      <div className="d-flex align-items-center">
                        <img src={e.isRead == true ? messageRead : messageNotRead} alt="messageRead" width={24} height={24} />
                        <p className="m-0 ms-3">
                          stansiyadan kelgan xabar
                        </p>
                      </div>
                      <p className="m-0">
                        {fixDate(e?.createdAt)}
                      </p>
                    </li>
                );
              })}
            </ul>

            <Pagination className="d-flex justify-content-center" defaultCurrent={pageData.page} total={getAllNotifications.totalDocuments} onChange={(page, size) => setPageData({page: page, perPage: size})} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserNotifications;
