import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L, { LatLngExpression } from "leaflet";
import carIcon from "/car.png";
import { Tooltip } from "react-leaflet";
import { TypeAnimation } from "react-type-animation";

const icon = L.icon({
  iconSize: [45, 45],
  popupAnchor: [2, -20],
  iconUrl: carIcon,
});

type Props = {
  lat: number;
  lon: number;
};

function MeMarker({ lat, lon }: Props) {
  const [prevPos, setPrevPos] = useState([lat, lon]);

  useEffect(() => {
    if (prevPos[1] !== lon && prevPos[0] !== lat) setPrevPos([lat, lon]);
  }, [lat, lon, prevPos]);

  return (
    <LeafletTrackingMarker
      icon={icon}
      position={[lat, lon]}
      previousPosition={prevPos as LatLngExpression}
      duration={1000}
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
