// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import AirplaneMarker from "./MeMarker";

// const dataStory = [
//   {
//     lat: 13.887078,
//     lng: 100.499456
//   },
//   {
//     lat: 13.321323,
//     lng: 100.5215151
//   },
//   {
//     lat: 13.3213123,
//     lng: 100.32131
//   },
//   {
//     lat: 13.512132,
//     lng: 100.32113
//   },
//   {
//     lat: 13.3123132,
//     lng: 100.54353345
//   },
//   {
//     lat: 13.12313123,
//     lng: 100.54353454
//   },
//   {
//     lat: 13.887078,
//     lng: 100.499456
//   },
// ];

// let cursor = 0;
// function Demo() {
//   const [currentTrack, setCurrentTrack] = useState({});

//   useEffect(() => {
//     setCurrentTrack(dataStory[cursor]);

//     const interval = setInterval(() => {
//       if (cursor === dataStory.length - 1) {
//         cursor = 0;
//         setCurrentTrack(dataStory[cursor]);
//         return;
//       }

//       cursor += 1;
//       setCurrentTrack(dataStory[cursor]);
//     }, 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div>
//       <MapContainer
//         style={{ height: "calc(100vh - 52px)" }}
//         center={[13.887078, 100.499456]}
//         zoom={17}
//         minZoom={5}
//       >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <AirplaneMarker data={currentTrack ?? {}} />
//       </MapContainer>
//     </div>
//   );
// }

// export default Demo