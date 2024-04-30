import React from "react";
import { useGeolocated } from "react-geolocated";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import Map from "./components/Map";
import Loading from "./components/Loading";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const MapComponent = React.lazy(() => 
  import('./components/Map'));

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
      watchPosition: true,
    });

  return (
    <>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation.</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled.</div>
      ) : coords ? (
        <div style={{ width: "100%", height: "100%", position: "fixed" }}>
          <MapComponent lat={coords.latitude} lon={coords.longitude} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
