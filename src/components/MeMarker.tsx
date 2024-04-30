import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L, { LatLngExpression } from "leaflet";
import carIcon from "/car.png";
import { Tooltip } from "react-leaflet";
import { TypeAnimation } from "react-type-animation";
import { useQuery } from "react-query";
import { getStations } from "../lib/getStations";
import Loading from "./Loading";

const icon = L.icon({
  iconSize: [45, 45],
  popupAnchor: [2, -20],
  iconUrl: carIcon,
});

function MeMarker({ lat, lon }: { lat: number; lon: number }) {
  const [prevPos, setPrevPos] = useState([lat, lon]);
  const [position, setPosition] = useState([lat, lon]);

  useEffect(() => {
    if (prevPos[1] !== lon && prevPos[0] !== lat) setPrevPos([lat, lon]);
  }, [lat, lon, prevPos]);

  const { data, isLoading } = useQuery(
    "stations",
    () => getStations({ lat: position[0], lng: position[1] }),
    {
      refetchInterval: 2000,
    }
  );

  if (isLoading) return <Loading />;
  if (!data) throw new Error();

  return (
    <LeafletTrackingMarker
      icon={icon}
      draggable
      position={position as LatLngExpression}
      // position={[lat, lon]}
      previousPosition={prevPos as LatLngExpression}
      rotationAngle={(Math.atan2(lon, lat) * 180.0) / Math.PI}
      duration={1000}
      autoPan
      eventHandlers={{
        moveend: (event) => {
          setPosition([
            event.target.getLatLng().lat,
            event.target.getLatLng().lng,
          ]);
        },
      }}
    >
      <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
        <TypeAnimation
          sequence={["You are here 🐱‍🏍 ", 1000]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "16px", display: "inline-block" }}
          repeat={Infinity}
        />
      </Tooltip>
    </LeafletTrackingMarker>
  );
}

export default MeMarker;
