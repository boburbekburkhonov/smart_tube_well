import React, { useEffect, useState } from "react";
import document from "../../assets/document.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { findAllRequirementForUser } from "../../redux/actions/application";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";

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
  const [statusForRequirement, setStatusForRequirement] = useState(1);
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
  }, [statusForRequirement]);

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
      text: "Jami talabnomalar",
      background: '#6c757d',
      color: '#fff'
    },
    {
      status: 1,
      text: "Jo'natilgan talabnomalar",
      background: '#007bff',
      color: '#fff'
    },
    {
      status: 2,
      text: "Qabul qilingan talabnomalar",
      background: '#17a2b8',
      color: '#fff'
    },
    {
      status: 3,
      text: "Ko'rib chiqilayotgan talabnomalar",
      background: '#ffc107',
      color: '#fff'
    },
    {
      status: 4,
      text: "To'liq bajarilgan talabnomalar",
      background: '#28a745',
      color: '#fff'
    },
    {
      status: -1,
      text: "Rad etilgan talabnomalar",
      background: '#dc3545',
      color: '#fff'
    },
    {
      status: -2,
      text: "Bajarilmagan talabnomalar",
      background: '#fd7e14',
      color: '#fff'
    },
    {
      status: -3,
      text: "To'liq bajarilmagan talabnomalar",
      background: '#6610f2',
      color: '#fff'
    },
  ];
  console.log(allRequirements);
  const returnTextOfStatus = (text) => {
    return String(text).split(" ").slice(0, String(text).split(" ").length - 1).join(' ')
  }

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
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Yopish
              </button>
              <button type="button" className="btn btn-success">
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      </div>
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
            <h2 className="m-0">Mening talabnomalarim</h2>
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
              <i className="fas fa-plus"></i> Yangi talabnoma qo'shish
            </button>
          </div>
        </div>

        <table class="table table-striped table-hover">
          <thead>
            <tr
              className="text-center"
              style={{
                background: colors.layoutBackground,
                color: colors.text,
                fontSize: '16px'
              }}
            >
              <th scope="col">#</th>
              <th scope="col">Supervisor</th>
              <th scope="col">Suv hajmi (m³)</th>
              <th scope="col">Status</th>
              <th scope="col">Talabnoma navbati</th>
              <th scope="col">Jo'natilgan vaqt</th>
            </tr>
          </thead>
          <tbody>
            {allRequirements.data?.map((e, i) => {
              return (
                <tr className="text-center" key={i}  style={{
                  fontSize: '16px'
                }}>
                  <th scope="row">{i + 1}</th>
                  <td>{e.supervisorUserName}</td>
                  <td>{e.waterVolume}</td>
                  <td className="d-flex justify-content-center">
                    <p className="m-0" style={{background: statusOfRequirement[e.status]?.background, color: statusOfRequirement[e.status]?.color, padding: '2px 0', borderRadius: '10px', width: '80%'} }>
                    {returnTextOfStatus(statusOfRequirement[e.status]?.text)}
                    </p>
                  </td>
                  <td>{e.requirementNumber}</td>
                  <td>{fixDate(e.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          className="d-flex justify-content-center"
          defaultCurrent={pageData.page}
          total={allRequirements.totalDocuments}
          onChange={(page, size) => setPageData({ page: page, perPage: size })}
        />
      </div>
    </div>
  );
};

export default UserApplications;
