import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Tooltip,
} from "react-leaflet";
import { ApiResponse } from "./types/ApiResponse";

function App() {
  const [data, setData] = useState<ApiResponse>();
  const [location, setLocation] = useState({
    latitude: 13.874155,
    longitude: 100.488589,
  });

  // console.log(data);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ latitude, longitude });
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${
          location.latitude
        }&lon=${
          location.longitude
        }&radius=10000&language=th-TH&categorySet=7309&view=Unified&relatedPois=off&key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data: ApiResponse = await response.json();
      setData(data);
    }

    fetchData();
  }, [location.latitude, location.longitude]);

  // function handleLocationClick() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   } else {
  //     console.log("Geolocation not supported");
  //   }
  // }

  // function success(position: GeolocationPosition) {
  //   console.log(position);
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   setLocation({ latitude, longitude });
  //   console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  // }

  // function error() {
  //   console.log("smth went wrong");
  // }

  return (
    <>
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
          <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>
            You are here
          </Tooltip>
        </Marker>
        {data?.results.map((result) => (
          <Circle
            key={result.id}
            center={[result.position.lat, result.position.lon]}
            pathOptions={{ fillColor: "red" }}
            radius={50}
            stroke={true}
            color="red"
            fillOpacity={0.5}
            children={
              <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
                {result.poi.name} {(result.dist / 1000).toFixed(2)} กม
              </Tooltip>
            }
          />
        ))}
      </MapContainer>
    </>
  );
}

export default App;
