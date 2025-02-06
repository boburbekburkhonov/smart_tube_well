import {
  AimOutlined,
  GlobalOutlined,
  GoogleOutlined,
  PhoneOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import imageProfile from "../../assets/profile.svg";
import "./index.css";

const SettingsProfile = () => {
  const { userInformationById } = useSelector((state) => state.dashboard);
  const { colors, theme } = useSelector((state) => state.theme);
  const [isActiveChangedBtn, setIsActiveChangedBtn] = useState(false);
  console.log(userInformationById);

  const changeUserInformation = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const firstName = formData.get("firstName");

    console.log(firstName);
  };

  return (
    <main className="settings_right">
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div className="d-flex align-items-center">
          <img className="profile-pic" src={imageProfile} alt="User Avatar" />
          <h3 className="profile_pic_heading ms-4">
            {userInformationById.firstName + " "}
            {userInformationById.lastName}
          </h3>
        </div>

        <button
          className="btn btn-success"
          style={{ background: colors.buttonColor }}
          onClick={() => setIsActiveChangedBtn(!isActiveChangedBtn)}
        >
          Ma'lumotlarni o'zgartirish
        </button>
      </div>
      <div className="settings-content">
        <form onSubmit={changeUserInformation}>
          <div
            className="d-flex flex-wrap justify-content-between align-items-center mb-4"
            style={{ gap: "20px" }}
          >
            <div>
              <label>Ism</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.firstName}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <UserOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Familiya</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.lastName}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <UserOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Foydalanuvchining logini</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.username}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <UserOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Elektron pochta</label>

              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.email}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <GoogleOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Telefon raqami</label>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.phone}
                  style={{ maxWidth: "300px" }}
                  disabled={!isActiveChangedBtn}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <PhoneOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Hudud nomi</label>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.regionName}
                  style={{ maxWidth: "300px" }}
                  disabled
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <GlobalOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Foydalanuvchi turi</label>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  defaultValue={userInformationById.roleName}
                  style={{ maxWidth: "300px" }}
                  disabled
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <UsergroupAddOutlined style={{ fontSize: "24px" }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {isActiveChangedBtn ? (
            <div className="d-flex justify-content-end align-items-center">
              <button
                type="submit"
                className="btn btn-success"
                style={{ background: colors.buttonColor }}
              >
                O'zgarishlarni saqlash
              </button>
              <button
                type="submit"
                className="btn btn-light ms-3"
                style={{background: '#F2F2F2'}}
                onClick={() => setIsActiveChangedBtn(!isActiveChangedBtn)}
              >
                O'zgarishlarni bekor qilish
              </button>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </main>
  );
};

export default SettingsProfile;
