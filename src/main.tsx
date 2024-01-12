import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher.ts";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);
