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
      console.log(res);

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
                  <label className="form-control-label-user-info">Ism</label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    Familiya
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    Foydalanuvchi nomi
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    Telefon raqam
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                  <label className="form-control-label-user-info">Email</label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                  <label className="form-control-label-user-info">Role</label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    Hudud nomi
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    Tuman nomi
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    Tashkilot nomi
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                Yopish
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
                    <label className="form-control-label-user-info">Ism</label>
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
                      Familiya
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
                      Foydalanuvchi nomi
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
                      Telefon raqam
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
                      Email
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
                  O'zgartirish
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
              <form onSubmit={updateUser}>
                <div className="profile-container">
                  <div
                    className="input-group input-group-first"
                    style={{
                      maxWidth: "360px",
                    }}
                  >
                    <label className="form-control-label-user-info">Ism</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Ism"
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
                      Familiya
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Familiya"

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
                      Foydalanuvchi nomi
                    </label>

                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Foydalanuvchi nomi"
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
                      Parol
                    </label>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Foydalanuvchi nomi"
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
                      Telefon raqam
                    </label>

                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Telefon raqam"
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
                      Email
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control form-control-input-user-info"
                      style={{
                        maxWidth: "250px",
                        background: "#f3f3f3",
                        padding: "10px",
                      }}
                      placeholder="Email"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <GoogleOutlined style={{ fontSize: "27px" }} />
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
                  Yaratish
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Foydalanuchilar</h2>

        <button
          className="user-application-btn-add"
          style={{ background: colors.layoutBackground }}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropForCreate"
        >
          <i className="fas fa-plus"></i> Foydalanuvchi yaratish
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
            <th scope="col">Ism</th>
            <th scope="col">Familiya</th>
            <th scope="col">Foydalanuvchi nomi</th>
            <th scope="col">Role</th>
            <th scope="col">O'zgartirish</th>
            <th scope="col">O'chirish</th>
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
                <td>
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
