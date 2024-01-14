// import useSWR from "swr";
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
import useSWR from "swr";
import { ApiResponse } from "../types/ApiResponse";
import { useDebounce } from "../lib/useDebouce";
import { fetcher } from "../lib/fetcher";
// import { ApiResponse } from "../types/ApiResponse";
import * as _ from "lodash";
// import { fetcher } from "../lib/fetcher";

function Map({ lat, lon }: { lat: number; lon: number }) {
  const debounceLatLon = useDebounce({ lat, lon }, 5000);
  const { data, isLoading } = useSWR<ApiResponse>(
    `nearbySearch/.json?lat=${debounceLatLon.lat}&lon=${
      debounceLatLon.lon
    }&radius=10000&language=th-TH&categorySet=7309&view=Unified&relatedPois=off&key=${
      import.meta.env.VITE_API_KEY
    }`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) throw new Error();

  console.log(data);

  const stationNames = _.groupBy(
    data?.results,
    (stationNames) => stationNames.poi.name
  );

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
                          {station.poi.name} {(station.dist / 1000).toFixed(2)}{" "}
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
