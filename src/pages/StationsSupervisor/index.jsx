import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { findAllStationsForSupervisor } from "../../redux/actions/station";
import { Pagination } from "antd";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import "./index.css";

const StationsSupervisor = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch();
  const { allStationsForSupervisor } = useSelector((state) => state.station);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
  });
  const { colors, theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(findAllStationsForSupervisor(lang, pageData));
  }, [pageData]);

  const mapContainerStyle = {
    width: "100%",
    height: "70vh",
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
        <div className="modal-dialog table-location-width-user-data modal-dialog-centered">
          <div className="modal-content modal-content-user-data">
            <div className="modal-header w-100">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                      <h2 className="fw-normal" style={{ fontSize: "18px" }}>
                        {t("stationPage.item7")}
                      </h2>
                    </div>
                  </InfoWindowF>
                )}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-5">{t("stationPage.item1")}</h2>

      {allStationsForSupervisor.data?.length == 0 || !isLoaded ? (
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
