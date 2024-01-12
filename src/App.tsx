import { useGeolocated } from "react-geolocated";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Map from "./components/Map";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  return (
    <>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation.</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled.</div>
      ) : coords ? (
        <Map lat={coords.latitude} lon={coords.longitude} />
      ) : (
        <div>Getting the location data&hellip;</div>
      )}
    </>
  );
}

export default App;
