import React, { useEffect, useState } from "react";
import document from "../../assets/document.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { findAllRequirementForUser } from "../../redux/actions/application";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";
import { postDataApi } from "../../utils/refreshDataApi";
import { toast, ToastContainer } from "react-toastify";

const UserApplications = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { colors, theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { allRequirements } = useSelector((state) => state.application);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [waterVolume, setWaterVolume] = useState("");
  const [value, setValue] = useState(0);
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

  const handleChange = (e) => {
    let num = e.target.value;
    // Faqat raqamlar yoki bo'sh qiymatga ruxsat beramiz
    if (num === "" || /^\d*\.?\d*$/.test(num)) {
      if (num !== "") {
        num = parseFloat(num);
        if (num > 1) return; // 1 dan katta sonlar kiritilmaydi
        if (num < 0) num = 0;
      }
      setValue(num);
    }
  };

  const createNewRequirement = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let waterVolume = formData.get("waterVolume");
    let cop = formData.get("cop");

    const data = {
      userId: userId,
      waterVolume: waterVolume * 1,
      cop: cop * 1,
      supervisorUserId: supervisorId,
    };

    postDataApi(`requirement-table/create?lang=${lang}`, data).then((data) => {
      if (data.data.statusCode === 200) {
        toast.success("Talabnoma muvaffaqqiyatli yuborildi");
        setCount(count + 1);
        e.target.reset();
        setValue(0);
        setWaterVolume(0);
      }
    });
  };

  return (
    <div>
      {/* ! MODAL */}
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
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body m-auto">
              <form onSubmit={createNewRequirement}>
                <div className="mb-3">
                  <label
                    className="modal-body-form-application-label mb-3"
                    htmlFor="waterVolume"
                  >
                    <i
                      className="fas fa-tint"
                      style={{ color: colors.buttonColor }}
                    ></i>{" "}
                    {t("applicationPage.item12")}:
                  </label>
                  <input
                    type="number"
                    id="waterVolume"
                    name="waterVolume"
                    className="form-control"
                    value={waterVolume}
                    onChange={(e) => setWaterVolume(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    className="modal-body-form-application-label mb-3"
                    htmlFor="cop"
                  >
                    <i
                      className="fas fa-percentage"
                      style={{ color: colors.buttonColor }}
                    ></i>{" "}
                    {t("applicationPage.item13")}:
                  </label>
                  <input
                    type="number"
                    id="cop"
                    name="cop"
                    min="0"
                    max="1"
                    step="0.1"
                    value={value}
                    onChange={handleChange}
                    onBlur={() => setValue(value === "" ? 0 : value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="result-box mb-4">
                  <i className="fas fa-calculator mb-3"></i>
                  {waterVolume.length == 0 || waterVolume == 0 ? (
                    ""
                  ) : (
                    <>
                      <div className="d-flex justify-content-center">
                        <p className="m-0 mb-3">
                          {`((1 - ${value}) * ${waterVolume}) + ${Number(
                            waterVolume
                          )} = `}
                        </p>
                        <b style={{ color: colors.buttonColor }}>
                          {Number(waterVolume) +
                            Math.ceil((1 - value) * waterVolume)}
                        </b>
                      </div>
                      <p>
                        {t("applicationPage.item19")}{" "}
                        <b>
                          <span style={{ color: colors.buttonColor }}>
                            {Number(waterVolume) +
                              Math.ceil((1 - value) * waterVolume)}{" "}
                            (m³)
                          </span>
                        </b>
                      </p>
                    </>
                  )}
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    {t("applicationPage.item17")}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success ms-3"
                    style={{ background: colors.layoutBackground }}
                  >
                    {t("applicationPage.item18")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="user-application-container">
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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

            <button
              className="user-application-btn-add"
              style={{ background: colors.layoutBackground }}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i className="fas fa-plus"></i> {t("applicationPage.item10")}
            </button>
          </div>
        </div>

        {allRequirements.data?.length == 0 ||
        allRequirements.data == undefined ? (
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

export default UserApplications;
