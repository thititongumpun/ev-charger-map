import {
  MapContainer,
  TileLayer,
  Tooltip,
  LayersControl,
  LayerGroup,
  Popup,
  Marker,
} from "react-leaflet";
import SetViewOnClick from "./SetViewOnClick";
import MeMarker from "./MeMarker";
import { useDebounce } from "../lib/useDebouce";
import * as _ from "lodash";
import { useQuery } from "react-query";
import { getStations } from "../lib/getStations";
import * as geolib from "geolib";
import { GeoBias } from "../types/ApiResponse";
import Loading from "./Loading";
import { TypeAnimation } from "react-type-animation";
import L from "leaflet";
import eaIcon from "/eaanywhere.png";

const stationIcon = L.icon({
  iconSize: [45, 45],
  popupAnchor: [2, -20],
  iconUrl: eaIcon,
});

function Map({ lat, lon }: { lat: number; lon: number }) {
  const debounceLatLon = useDebounce({ lat, lon }, 5000);
  const { data, isLoading } = useQuery("stations", () =>
    getStations({ lat: debounceLatLon.lat, lng: debounceLatLon.lon })
  );

  if (isLoading) return <Loading />;
  if (!data) throw new Error();

  const stationNames = _.groupBy(
    data?.results,
    (stationNames) => stationNames.poi.name
  );

  const getDistance = ({ geo }: { geo: GeoBias }) => {
    const dist = geolib.getPreciseDistance(geo, {
      lat,
      lon,
    });

    return dist;
  };

  return (
    <>
      <MapContainer
        center={[lat, lon]}
        zoom={14}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100vw",
          position: "relative",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="You">
            <MeMarker lat={lat} lon={lon} />
          </LayersControl.Overlay>
          {Object.keys(stationNames).map((name) => (
            <LayersControl.Overlay key={name} checked name={name}>
              <LayerGroup>
                {stationNames[name].map((station) => (
                  <Marker
                    key={station.id}
                    position={[station.position.lat, station.position.lon]}
                    icon={stationIcon}
                  >
                    <Tooltip
                      direction="top"
                      offset={[0, 0]}
                      opacity={1}
                      permanent
                    >
                      {station.poi.name}
                      {(getDistance({ geo: station.position }) / 1000).toFixed(
                        2
                      )}{" "}
                      กม
                    </Tooltip>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      <Popup>
                        <span>{station.poi.name}</span> <br />
                        <span>{station.address.freeformAddress}</span> <br />
                        <span>
                          {station.chargingPark.connectors.length} หัวชาจ
                        </span>
                        <br />
                        {station.chargingPark.connectors.map(
                          (connector, idx) => (
                            <TypeAnimation
                              key={idx}
                              sequence={[
                                `
                                  หัวจ่าย ${connector.currentType}
                                  ไฟ ${connector.voltageV} volt
                                  จ่ายไฟ ${connector.ratedPowerKW} kw
                                  ประเภทหัวจ่าย ${connector.connectorType}
                                  `,
                                1000,
                              ]}
                              wrapper="span"
                              speed={90}
                              style={{
                                fontSize: "14px",
                                whiteSpace: "pre-line",
                              }}
                              repeat={Infinity}
                            />
                          )
                        )}
                      </Popup>
                    </div>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          ))}
        </LayersControl>
        <SetViewOnClick />
      </MapContainer>
    </>
  );
}

export default Map;
