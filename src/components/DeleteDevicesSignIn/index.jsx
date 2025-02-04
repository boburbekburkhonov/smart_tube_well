import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteImg from "../../assets/delete.svg";
import logoImg from "../../assets/app_logo_white.png";
import "./index.css";
import { useTranslation } from "react-i18next";
import { postDataApi } from "../../utils";
import { moreDevicesDeleteToSignInAction } from "../../redux/actions/authActions";
import moment from 'moment'

const DeleteDevicesSignIn = () => {
  const { signInMessage, verifySignInMessage } = useSelector(
    (state) => state.auth
  );
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { colors } = useSelector((state) => state.theme);
  const [devicesList, setDevicesList] = useState([]);
  const dispatch = useDispatch();


  const collectIdDeletedDevice = (item) => {
    if (!devicesList.includes(item.id)) {
      const updatedList = [...devicesList, item.id];
      setDevicesList(updatedList);
    } else {
      setDevicesList(devicesList.filter((id) => id !== item.id));
    }
  };

  const deleteDevicesChoosen = async () => {
    const dataToDelete = {
      username: signInMessage.username,
      password: signInMessage.password,
      deviceName: verifySignInMessage.devices[0]?.deviceName,
      deviceOS: verifySignInMessage.devices[0]?.deviceOS,
      userDeviceIdList: devicesList,
    };

    dispatch(moreDevicesDeleteToSignInAction(dataToDelete, lang))
  };

  return (
    <div className="delete_device_sign_in">
      <div className="delete_device_sign_in_wrapper">
        <img src={logoImg} alt="logoImg" width={150} height={150} />
        <h3
          className="delete_device_sign_in_heading mt-5 mb-5"
          style={{ color: colors.loginHeadingColor }}
        >
          {verifySignInMessage.message}
        </h3>

        <table className="table delete_device_sign_in_table table-hover">
          <thead>
            <tr
              style={{
                textAlign: "center",
                background: colors.layoutBackground,
                color: colors.text,
              }}
            >
              <th scope="col">#</th>
              <th scope="col">Qurilma nomi</th>
              <th scope="col">Qurilma IP manzili</th>
              <th scope="col">Oxirgi faolligi</th>
              <th scope="col">O'chirish</th>
            </tr>
          </thead>
          <tbody>
            {verifySignInMessage.devices.map((e, i) => {
              return (
                <tr
                  key={i}
                  style={
                    devicesList.some((item) => item == e.id)
                      ? {
                          textAlign: "center",
                          color: "red",
                          textDecoration: "line-through",
                        }
                      : { textAlign: "center" }
                  }
                >
                  <th scope="row">{i + 1}</th>
                  <td>{e.deviceName}</td>
                  <td>{e.ipAddress}</td>
                  <td>{moment(e.lastActiveAt).format('L')} {moment(e.lastActiveAt).format('LTS').split(' ')[0]}</td>
                  <td
                    className="delete_device_sign_in_table_delete_btn"
                    style={{ cursor: "pointer" }}
                    onClick={() => collectIdDeletedDevice(e)}
                  >
                    <img
                      src={deleteImg}
                      alt="deleteImg"
                      width={20}
                      height={20}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {devicesList.length > 0 ? (
          <button
            onClick={() => deleteDevicesChoosen()}
            className="btn btn-success delete_device_sign_in_btn"
            style={{ background: colors.buttonColor }}
          >
            O'chirish
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DeleteDevicesSignIn;
