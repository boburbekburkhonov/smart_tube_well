import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { findAllUsers } from "../../redux/actions/user";
import {
  BankOutlined,
  DeleteOutlined,
  FlagOutlined,
  GlobalOutlined,
  GoogleOutlined,
  PhoneOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import updateImg from "../../assets/update.png";
import imageProfile from "../../assets/profile.svg";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { postDataApi } from "../../utils/refreshDataApi";
import imageAlertDelete from "../../assets/alert-delete.png";

const UsersSupervisor = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [userInfo, setUserInfo] = useState({});
  const [count, setCount] = useState(0);
  const { colors, theme } = useSelector((state) => state.theme);
  const regionId = window.localStorage.getItem("regionId");
  const districtId = window.localStorage.getItem("districtId");
  const organizationId = window.localStorage.getItem("organizationId");
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    dispatch(findAllUsers(lang, pageData));
  }, [count]);

  const findUserById = (id) => {
    const foundUser = allUsers.usersData?.find((e) => e.id == id);

    setUserInfo(foundUser);
  };

  const updateUser = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username, email, phone } = e.target;

    const data = {
      id: userInfo.id,
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      phone: phone.value,
      email: email.value,
      roleId: userInfo.roleId,
      regionId: userInfo.regionId,
      districtId: userInfo.districtId,
      organizationId: userInfo.organizationId,
    };

    try {
      const res = await postDataApi(`users/update?lang=${lang}`, data);

      if (res.data.statusCode === 200) {
        toast.success(t("toast.successProfile"));
        localStorage.setItem("firstName", data.firstName);
        setCount(count + 1);
        window.location.reload();
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

  const createUser = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username, password, phone, email } = e.target;

    const data = {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
      phone: phone.value,
      email: email.value,
      roleId: "6791f379bd0c23173e7bf9dd",
      regionId: regionId,
      districtId: districtId,
      organizationId: organizationId,
      supervisorUserId: userId,
    };

    try {
      const res = await postDataApi(`users/create?lang=${lang}`, data);

      if (res.data.statusCode === 200) {
        toast.success(t("toast.successCreateUser"));
        setCount(count + 1);

        firstName.value = "";
        lastName.value = "";
        username.value = "";
        password.value = "";
        phone.value = "+998";
        email.value = "";
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

  const deleteUser = async () => {
    const data = {
      id: userInfo.id,
    };

    try {
      const res = await postDataApi(`users/delete?lang=${lang}`, data);

      if (res.data.statusCode === 200) {
        toast.success(t("toast.successDeleteUser"));
        setCount(count + 1);
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
    <div>
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
      {/* MODAL GET INFO */}
      <div
        className="modal fade"
        id="staticBackdropForInfo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog table-location-width-user-data modal-dialog-centered">
          <div className="modal-content modal-content-user-data">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="profile-header">
                <img src={imageProfile} alt="Profil rasmi" />
                <h2 className="mt-4">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h2>
              </div>
              <div className="profile-container d-flex flex-wrap align-items-center justify-content-between">
                <div
                  className="input-group input-group-first"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item3")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={userInfo?.firstName ? userInfo?.firstName : ""}
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <UserOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item4")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={userInfo?.lastName ? userInfo?.lastName : ""}
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <UserOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item5")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={userInfo?.username ? userInfo?.username : ""}
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <UserOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item6")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={userInfo?.phone ? userInfo?.phone : ""}
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <PhoneOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item7")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={userInfo?.email ? userInfo?.email : ""}
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <GoogleOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item8")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={userInfo?.role?.name ? userInfo?.role?.name : ""}
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <UsergroupAddOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item9")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={userInfo?.regionName ? userInfo?.regionName : ""}
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <GlobalOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item10")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={userInfo?.districtName ? userInfo?.districtName : ""}
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <FlagOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>

                <div
                  className="input-group"
                  style={{
                    maxWidth: "360px",
                  }}
                >
                  <label className="form-control-label-user-info">
                    {t("usersPage.item11")}
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-input-user-info"
                    value={
                      userInfo?.organizationName
                        ? userInfo?.organizationName
                        : ""
                    }
                    style={{
                      maxWidth: "250px",
                      background: "#f3f3f3",
                      padding: "10px",
                    }}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <BankOutlined style={{ fontSize: "27px" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{
                  background: colors.layoutBackground,
                  color: colors.text,
                }}
              >
                {t("usersPage.item13")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL UPDATE */}
      <div
        className="modal fade"
        id="staticBackdropForUpdate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog table-location-width-user-data modal-dialog-centered">
          <div className="modal-content modal-content-user-data-update">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="profile-header">
                <img src={imageProfile} alt="Profil rasmi" />
                <h2 className="mt-4">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h2>
              </div>
              <form onSubmit={updateUser}>
                <div className="profile-container">
                  <div
                    className="input-group input-group-first"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item3")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="form-control form-control-input-user-info"
                      defaultValue={
                        userInfo?.firstName ? userInfo?.firstName : ""
                      }
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <UserOutlined style={{ fontSize: "31px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label
                      htmlFor="lastName"
                      className="form-control-label-user-info"
                    >
                      {t("usersPage.item4")}
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="form-control form-control-input-user-info"
                      defaultValue={
                        userInfo?.lastName ? userInfo?.lastName : ""
                      }
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <UserOutlined style={{ fontSize: "31px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item5")}
                    </label>

                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control form-control-input-user-info"
                      defaultValue={
                        userInfo?.username ? userInfo?.username : ""
                      }
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <UserOutlined style={{ fontSize: "31px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item6")}
                    </label>

                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control form-control-input-user-info"
                      defaultValue={userInfo?.phone ? userInfo?.phone : ""}
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <PhoneOutlined style={{ fontSize: "31px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item7")}
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control form-control-input-user-info"
                      defaultValue={userInfo?.email ? userInfo?.email : ""}
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <GoogleOutlined style={{ fontSize: "31px" }} />
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary ms-auto d-flex"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{
                    background: colors.layoutBackground,
                    color: colors.text,
                  }}
                >
                  {t("usersPage.item14")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CREATE */}
      <div
        className="modal fade"
        id="staticBackdropForCreate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog table-location-width-user-data-create modal-dialog-centered">
          <div className="modal-content modal-content-user-data-create">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <div className="profile-header">
                <img src={imageProfile} alt="Profil rasmi" />
                <h2 className="mt-4">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h2>
              </div> */}
              <form onSubmit={createUser}>
                <div className="profile-container">
                  <div
                    className="input-group input-group-first"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item3")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstNameForCreate"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Ism"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <UserOutlined style={{ fontSize: "27px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label
                      htmlFor="lastName"
                      className="form-control-label-user-info"
                    >
                      {t("usersPage.item4")}
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      id="lastNameForCreate"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Familiya"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <UserOutlined style={{ fontSize: "27px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item5")}
                    </label>

                    <input
                      type="text"
                      name="username"
                      id="usernameForCreate"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Foydalanuvchi nomi"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <UserOutlined style={{ fontSize: "27px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item12")}
                    </label>

                    <input
                      type="password"
                      name="password"
                      id="passwordForCreate"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Foydalanuvchi nomi"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <UserOutlined style={{ fontSize: "27px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item6")}
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      id="phoneForCreate"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Telefon raqam"
                      required
                      defaultValue="+998"
                      maxLength={13}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <PhoneOutlined style={{ fontSize: "27px" }} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">
                      {t("usersPage.item7")}
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="emailForCreate"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Email"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <GoogleOutlined style={{ fontSize: "27px" }} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-xl-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    {t("usersPage.item13")}
                  </button>

                  <button
                    type="submit"
                    className="btn btn-secondary ms-3"
                    style={{
                      background: colors.layoutBackground,
                      color: colors.text,
                    }}
                  >
                    {t("usersPage.item16")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DELETE */}
      <div
        className="modal fade"
        id="staticBackdropForDelete"
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
              <p className="m-0 text-center">{t("usersPage.item17")}</p>
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
                onClick={() => deleteUser()}
                data-bs-dismiss="modal"
              >
                {t("settingNavbar.deleteUser.item14")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t("usersPage.item1")}</h2>

        <button
          className="user-application-btn-add"
          style={{ background: colors.layoutBackground }}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropForCreate"
        >
          <i className="fas fa-plus"></i> {t("usersPage.item2")}
        </button>
      </div>

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
            <th scope="col">{t("usersPage.item3")}</th>
            <th scope="col">{t("usersPage.item4")}</th>
            <th scope="col">{t("usersPage.item5")}</th>
            <th scope="col">{t("usersPage.item8")}</th>
            <th scope="col">{t("usersPage.item14")}</th>
            <th scope="col">{t("usersPage.item15")}</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.usersData?.map((e, i) => {
            return (
              <tr
                key={i}
                className="text-center cursor_pointer"
                onClick={() => findUserById(e.id)}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropForInfo"
              >
                <th scope="row">{i + 1}</th>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.username}</td>
                <td>{e.role.name}</td>
                <td
                  onClick={() => findUserById(e.id)}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropForUpdate"
                >
                  <img src={updateImg} alt="updateImg" width={24} height={24} />
                </td>
                <td
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropForDelete"
                >
                  <DeleteOutlined style={{ fontSize: "18px" }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersSupervisor;
