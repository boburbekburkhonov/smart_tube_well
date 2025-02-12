import React, { useEffect, useState } from "react";
import "./index.css";
import {
  BankOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  GlobalOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { findAllStationsForUser } from "../../redux/actions/station";
import { useTranslation } from "react-i18next";

const UserStations = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const { allStations } = useSelector((state) => state.station);
  const { colors, theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(findAllStationsForUser(lang));
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 41.2995,
    lng: 69.2401,
  };

  const markers = [
    { id: 1, position: { lat: 41.2995, lng: 69.2401 }, title: "Marker 1" },
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `AIzaSyC57hT2pRJZ4Gh85ai0sUjP72i7VYJxTHc&region=UZ&language=${lang}`,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div className="user-stations ">
      <h2 className="mb-5">{t("stationPage.item1")}</h2>

      {!isLoaded ? (
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
        <div className="d-flex justify-content-between flex-wrap">
          <div className="user-stations-left">
            <h2 className="text-center mb-4 fs-3">{allStations.name}</h2>

            <ul className="list-unstyled m-0 p-0">
              <li
                className="user-stations-item d-flex justify-content-between align-items-center mb-4"
                style={{ border: `3px solid ${colors.buttonColor}` }}
              >
                <div className="d-flex align-items-center">
                  <BankOutlined
                    style={{
                      fontSize: "28px",
                    }}
                  />
                  <h2 className="m-0 ms-3">{t("stationPage.item2")}:</h2>
                </div>

                <h2 className="m-0">{allStations.organization}</h2>
              </li>

              <li
                className="user-stations-item d-flex justify-content-between align-items-center mb-4"
                style={{ border: `3px solid ${colors.buttonColor}` }}
              >
                <div className="d-flex align-items-center">
                  <GlobalOutlined
                    style={{
                      fontSize: "28px",
                    }}
                  />
                  <h2 className="m-0 ms-3">{t("stationPage.item3")}:</h2>
                </div>

                <h2 className="m-0">{allStations.regionName}</h2>
              </li>

              <li
                className="user-stations-item d-flex justify-content-between align-items-center mb-4"
                style={{ border: `3px solid ${colors.buttonColor}` }}
              >
                <div className="d-flex align-items-center">
                  <EnvironmentOutlined
                    style={{
                      fontSize: "28px",
                    }}
                  />
                  <h2 className="m-0 ms-3">{t("stationPage.item4")}:</h2>
                </div>

                <h2 className="m-0">{allStations.districtName}</h2>
              </li>

              <li
                className="user-stations-item d-flex justify-content-between align-items-center mb-4"
                style={{ border: `3px solid ${colors.buttonColor}` }}
              >
                <div className="d-flex align-items-center">
                  <EyeOutlined
                    style={{
                      fontSize: "28px",
                    }}
                  />
                  <h2 className="m-0 ms-3">{t("stationPage.item5")}:</h2>
                </div>

                <h2 className="m-0">{allStations.code}</h2>
              </li>

              <li
                className="user-stations-item d-flex justify-content-between align-items-center mb-4"
                style={{ border: `3px solid ${colors.buttonColor}` }}
              >
                <div className="d-flex align-items-center">
                  <PhoneOutlined
                    style={{
                      fontSize: "28px",
                    }}
                  />
                  <h2 className="m-0 ms-3">{t("stationPage.item6")}:</h2>
                </div>

                <h2 className="m-0">{allStations.devicePhoneNumber}</h2>
              </li>
            </ul>
          </div>

          <div className="user-stations-right">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={18}
            >
              {markers.map((marker) => (
                <MarkerF
                  key={marker.id}
                  position={marker.position}
                  onClick={() => setSelectedMarker(marker)}
                />
              ))}

              {selectedMarker && (
                <InfoWindowF
                  options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
                  position={selectedMarker.position}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div>
                    <h2 className="fw-normal" style={{ fontSize: "18px" }}>
                      {t("stationPage.item7")}
                    </h2>
                  </div>
                </InfoWindowF>
              )}
            </GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStations;
