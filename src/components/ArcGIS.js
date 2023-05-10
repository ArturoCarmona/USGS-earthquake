import React from "react";
import config from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import Zoom from "@arcgis/core/widgets/Zoom";
import "@arcgis/core/assets/esri/themes/light/main.css";

function ArcGIS() {
  function getMap() {
    const API_KEY =
      "AAPKfc7b189f70fb41499b4d7a6a03651b81rHnrb9zDNgOCG7VoX1_7eaIzazH01CyFqzU-YyGsw0CmTRPu4_ihVFyY6SoA9r5m";
    config.apiKey = API_KEY;

    const view = new MapView({
      map: "arcgis-topographic",
      center: [-116.7776667, 33.6633333],
      zoom: 13,
      container: document.getElementById("root"),
      ui: { components: ["attribution"] },
    });

    const zoom = new Zoom({ view: view });
    view.ui.add(zoom, { position: "top-left" });
  }
  return (
    <div>
      <button onClick={getMap}>Mapa</button>
      <div id="divMap"></div>
    </div>
  );
}

export default ArcGIS;
