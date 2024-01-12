import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const [location, setLocation] = useState({ latitude: 13.8870784, longitude: 100.499456 });
  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: GeolocationPosition) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("smth went wrong");
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <button onClick={handleLocationClick}>Click</button>
        <p>{location.latitude}</p>
        <br />
        <p>{location.longitude}</p>
      </div>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ minHeight: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
