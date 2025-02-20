import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { findAllStationsForSupervisor } from "../../redux/actions/station";
import { Button, Pagination } from "antd";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import "./index.css";
import {
  BankOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  GlobalOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const StationsSupervisor = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const { allStationsForSupervisor } = useSelector((state) => state.station);
  const [oneStationInfo, setOneStationInfo] = useState({});
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const [modalPage, setModalPage] = useState("info");
  const { colors, theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(findAllStationsForSupervisor(lang, pageData));
  }, [pageData]);

  const mapContainerStyle = {
    width: "100%",
    height: "45vh",
    margin: "auto",
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

  const findOneStationById = (id) => {
    const foundStation = allStationsForSupervisor.data.find((e) => e.id === id);

    setOneStationInfo(foundStation);
  };

  if (!isLoaded) return <p>loading...</p>;

  return (
    <div className="user-stations">
      {/* MODAL */}
      <div
        className="modal fade"
        id="staticBackdropForMap"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog table-location-width-user-data-station modal-dialog-centered">
          <div className="modal-content modal-content-user-data-station">
            <div className="modal-header w-100">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalPage('info')}
              ></button>
            </div>
            <div className="modal-body">
              <h2 className="text-center">
                {oneStationInfo.name} ma'lumotlari
              </h2>

              <div className="mb-5 mt-4">
                <Button
                className={modalPage == 'info' ? 'btn_stations_modal active_btn_stations_modal' : 'btn_stations_modal'}
                  icon={<EyeOutlined style={{color: modalPage == 'info' ? colors.buttonColor : colors.text}} />}
                  style={{ background: colors.layoutBackground,  color: colors.text, fontSize: "17px", border: `1px solid ${colors.buttonColor}` }}
                  onClick={() => setModalPage('info')}
                >
                  Ma'lumotlarini ko'rish
                </Button>

                <Button
               className={modalPage == 'location' ? 'btn_stations_modal active_btn_stations_modal ms-3' : 'btn_stations_modal ms-3'}
                  icon={<GlobalOutlined style={{color: modalPage == 'location' ? colors.buttonColor : colors.text}} />}
                  style={{ background: colors.layoutBackground,  color: colors.text, fontSize: "17px", border: `1px solid ${colors.buttonColor}` }}
                  onClick={() => setModalPage('location')}
                >
                  Joylashgan koordinatasini ko'rish
                </Button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                {modalPage == "info" ? (
                  <ul className="stations-supervisor-list-modal list-unstyled m-0 p-0 m-auto mb-4">
                    <li
                      className="user-stations-item d-flex justify-content-between align-items-center"
                      style={{ border: `3px solid ${colors.buttonColor}` }}
                    >
                      <div className="d-flex align-items-center">
                        <BankOutlined
                          style={{
                            fontSize: "25px",
                          }}
                        />
                        <h2 className="m-0 ms-3">{t("stationPage.item2")}:</h2>
                      </div>

                      <h2 className="m-0">{oneStationInfo.organization}</h2>
                    </li>

                    <li
                      className="user-stations-item d-flex justify-content-between align-items-center"
                      style={{ border: `3px solid ${colors.buttonColor}` }}
                    >
                      <div className="d-flex align-items-center">
                        <GlobalOutlined
                          style={{
                            fontSize: "25px",
                          }}
                        />
                        <h2 className="m-0 ms-3">{t("stationPage.item3")}:</h2>
                      </div>

                      <h2 className="m-0">{oneStationInfo.regionName}</h2>
                    </li>

                    <li
                      className="user-stations-item d-flex justify-content-between align-items-center"
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

                      <h2 className="m-0">{oneStationInfo.districtName}</h2>
                    </li>

                    <li
                      className="user-stations-item d-flex justify-content-between align-items-center"
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

                      <h2 className="m-0">{oneStationInfo.code}</h2>
                    </li>

                    <li
                      className="user-stations-item d-flex justify-content-between align-items-center"
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

                      <h2 className="m-0">
                        {oneStationInfo.devicePhoneNumber}
                      </h2>
                    </li>
                  </ul>
                ) : (
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
                        options={{
                          pixelOffset: new window.google.maps.Size(0, -40),
                        }}
                        position={selectedMarker.position}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div>
                          <h2
                            className="fw-normal"
                            style={{ fontSize: "18px" }}
                          >
                            {t("stationPage.item7")}
                          </h2>
                        </div>
                      </InfoWindowF>
                    )}
                  </GoogleMap>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-5">{t("stationPage.item1")}</h2>

      {allStationsForSupervisor.data == undefined ||
      allStationsForSupervisor.data?.length == 0 ||
      !isLoaded ? (
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
                style={{
                  background: colors.layoutBackground,
                  color: colors.text,
                  fontSize: "16px",
                }}
              >
                <th scope="col">#</th>
                <th scope="col">{t("stationPage.item8")}</th>
                <th scope="col">{t("stationPage.item2")}</th>
                <th scope="col">{t("stationPage.item3")}</th>
                <th scope="col">{t("stationPage.item4")}</th>
                <th scope="col">{t("stationPage.item5")}</th>
                <th scope="col">{t("stationPage.item6")}</th>
              </tr>
            </thead>
            <tbody>
              {allStationsForSupervisor.data?.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className="cursor_pointer"
                    onClick={() => findOneStationById(e.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdropForMap"
                  >
                    <th scope="row">{i + 1}</th>
                    <td>{e.name}</td>
                    <td>{e.organization}</td>
                    <td>{e.regionName}</td>
                    <td>{e.districtName}</td>
                    <td>{e.code}</td>
                    <td>{e.devicePhoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            className="d-flex justify-content-center"
            defaultCurrent={pageData.page}
            total={allStationsForSupervisor.totalDocuments}
            onChange={(page, size) =>
              setPageData({ page: page, perPage: size })
            }
          />
        </>
      )}
    </div>
  );
};

export default StationsSupervisor;
