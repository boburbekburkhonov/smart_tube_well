import React, { useEffect, useState } from "react";
import document from "../../assets/document.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { findAllRequirementForUser } from "../../redux/actions/application";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";
import { postDataApi } from "../../utils/refreshDataApi";
import { toast, ToastContainer } from "react-toastify";

const ApplicationsSupervisor = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { colors, theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { allRequirements } = useSelector((state) => state.application);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [statusForRequirement, setStatusForRequirement] = useState(1);
  const [count, setCount] = useState(0);
  const userId = window.localStorage.getItem("userId");
  const supervisorId = window.localStorage.getItem("supervisorId");

  useEffect(() => {
    dispatch(
      findAllRequirementForUser(
        supervisorId,
        userId,
        statusForRequirement,
        lang,
        pageData
      )
    );
  }, [statusForRequirement, count, pageData]);

  const fixDate = (time) => {
    const fixedTime = new Date(time);
    fixedTime.setHours(fixedTime.getHours() - 5);

    const date = `${fixedTime.getDate()}.${
      fixedTime.getMonth() + 1
    }.${fixedTime.getFullYear()} ${fixedTime.getHours()}:${
      String(fixedTime.getMinutes()).length == 1
        ? "0" + fixedTime.getMinutes()
        : fixedTime.getMinutes()
    }`;

    return date;
  };

  const statusOfRequirement = [
    {
      status: 0,
      text: t("applicationPage.item2"),
      background: "#6c757d",
      color: "#fff",
    },
    {
      status: 1,
      text: t("applicationPage.item3"),
      background: "#007bff",
      color: "#fff",
    },
    {
      status: 2,
      text: t("applicationPage.item4"),
      background: "#17a2b8",
      color: "#fff",
    },
    {
      status: 3,
      text: t("applicationPage.item5"),
      background: "#ffc107",
      color: "#fff",
    },
    {
      status: 4,
      text: t("applicationPage.item6"),
      background: "#28a745",
      color: "#fff",
    },
    {
      status: -1,
      text: t("applicationPage.item7"),
      background: "#dc3545",
      color: "#fff",
    },
    {
      status: -2,
      text: t("applicationPage.item8"),
      background: "#fd7e14",
      color: "#fff",
    },
    {
      status: -3,
      text: t("applicationPage.item9"),
      background: "#6610f2",
      color: "#fff",
    },
  ];

  const returnTextOfStatus = (text) => {
    return String(text)
      .split(" ")
      .slice(0, String(text).split(" ").length - 1)
      .join(" ");
  };

  return (
    <div>
      <div className="user-application-container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div className="d-flex justify-content-between align-items-center">
            <img
              className="me-2"
              src={document}
              alt="document"
              width={30}
              height={30}
            />
            <h2 className="m-0">{t("applicationPage.item1")}</h2>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <select
              className="form-select user-application-select me-3"
              aria-label="Default select example"
              onChange={(e) => setStatusForRequirement(e.target.value)}
            >
              {statusOfRequirement.map((e, i) => {
                return (
                  <option value={e.status} key={i}>
                    {e.text}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {allRequirements.length == 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
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
          </div>
        ) : (
          <>
            <table className="table table-striped table-hover">
              <thead>
                <tr
                  className="text-center"
                  style={{
                    background: colors.layoutBackground,
                    color: colors.text,
                    fontSize: "16px",
                  }}
                >
                  <th scope="col">#</th>
                  <th scope="col">{t("applicationPage.item11")}</th>
                  <th scope="col">{t("applicationPage.item12")}</th>
                  <th scope="col">{t("applicationPage.item13")}</th>
                  <th scope="col">{t("applicationPage.item14")}</th>
                  <th scope="col">{t("applicationPage.item15")}</th>
                  <th scope="col">{t("applicationPage.item16")}</th>
                </tr>
              </thead>
              <tbody>
                {allRequirements.data?.map((e, i) => {
                  return (
                    <tr
                      className="text-center"
                      key={i}
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <th scope="row">{e.requirementNumber}</th>
                      <td>{e.supervisorUserName}</td>
                      <td>{e.waterVolume}</td>
                      <td>{e.cop}</td>
                      <td className="d-flex justify-content-center">
                        <p
                          className="m-0"
                          style={{
                            background:
                              statusOfRequirement[e.status]?.background,
                            color: statusOfRequirement[e.status]?.color,
                            padding: "2px 0",
                            borderRadius: "10px",
                            width: "80%",
                          }}
                        >
                          {returnTextOfStatus(
                            statusOfRequirement[e.status]?.text
                          )}
                        </p>
                      </td>
                      <td>{fixDate(e.createdAt)}</td>
                      <td>
                        {e.createdAt == e.updatedAt
                          ? "-"
                          : fixDate(e.updatedAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Pagination
              className="d-flex justify-content-center"
              defaultCurrent={pageData.page}
              total={allRequirements.totalDocuments}
              onChange={(page, size) =>
                setPageData({ page: page, perPage: size })
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsSupervisor;
