import {
  MapContainer,
  TileLayer,
  Circle,
  Tooltip,
  LayersControl,
  LayerGroup,
  Popup,
} from "react-leaflet";
import SetViewOnClick from "./SetViewOnClick";
import MeMarker from "./MeMarker";
import { useDebounce } from "../lib/useDebouce";
import * as _ from "lodash";
import { useQuery } from "react-query";
import { getStations } from "../lib/getStations";
import * as geolib from "geolib";
import { GeoBias } from "../types/ApiResponse";

function Map({ lat, lon }: { lat: number; lon: number }) {
  const debounceLatLon = useDebounce({ lat, lon }, 5000);
  const { data, isLoading } = useQuery("stations", () =>
    getStations({ lat: debounceLatLon.lat, lng: debounceLatLon.lon })
  );

  if (isLoading) return <div>Loading...</div>;
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
                  <Circle
                    key={station.id}
                    center={[station.position.lat, station.position.lon]}
                    pathOptions={{ fillColor: "red" }}
                    radius={30}
                    stroke={true}
                    color="red"
                    fillOpacity={0.5}
                    children={
                      <>
                        <Popup>{station.address.freeformAddress}</Popup>
                        <Tooltip
                          direction="top"
                          offset={[0, 0]}
                          opacity={1}
                          permanent
                        >
                          {station.poi.name}{" "}
                          {(
                            getDistance({ geo: station.position }) / 1000
                          ).toFixed(2)}{" "}
                          กม
                        </Tooltip>
                      </>
                    }
                  />
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
