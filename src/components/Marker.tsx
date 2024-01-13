import { Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";

function MeMarker({ lat, lon }: { lat: number; lon: number }) {
  const [prevPos, setPrevPos] = useState([lat, lon]);

  useEffect(() => {
    if (prevPos[1] !== lon && prevPos[0] !== lat) setPrevPos([lat, lon]);
  }, [lat, lon, prevPos]);

  return (
    <LeafletTrackingMarker
      position={[lat, lon]}
      previousPosition={prevPos as LatLngExpression}
      duration={1000}
      children={
        <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
          You are here
        </Tooltip>
      }
    />
  );
}

export default MeMarker;
