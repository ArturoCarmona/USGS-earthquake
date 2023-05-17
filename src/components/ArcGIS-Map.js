import { LitElement, html, css } from "lit-element";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import config from "@arcgis/core/config";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Zoom from "@arcgis/core/widgets/Zoom";

export class ArcGISMap extends LitElement {
  static get properties() {
    return {
      URL_USGS: { type: String },
      coordinates: { type: Array },
      zoom: { type: Number },
    };
  }

  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = css([
      Object.values(cssRules)
        .map((rule) => rule.cssText)
        .join("\n"),
    ]);
    return [
      globalStyle,
      css`
        #map {
          padding: 0;
          margin: 0;
          height: 500px;
          width: 500px;
        }
        #btn-map {
          font-family: arial, sans-serif;
          background-color: rgb(167, 20, 167);
          color: white;
          width: 50px;
          height: 25px;
          text-align: center;
          border: 1px solid rgb(167, 20, 167);
          border-radius: 2px;
          cursor: pointer;
        }
        #btn-close {
          font-family: arial, sans-serif;
          background-color: red;
          color: white;
          width: 30px;
          height: 30px;
          text-align: center;
          border: 1px solid red;
          border-radius: 15px;
          cursor: pointer;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.URL_USGS = "";
    this.coordinates = [];
    this.zoom = 5;
  }

  getMap() {
    this.createModal();
    this.createMapContainer();

    /* === TEMPLATE === */
    const template = {
      title: "Earthquake Info",
      content: "Magnitude {mag} {type} hit {place} on {time}",
      fieldInfos: [
        {
          fieldName: "time",
          format: {
            dateFormat: "short-date-short-time",
          },
        },
      ],
    };
    /* === RENDERER === */
    const renderer = {
      type: "simple",
      field: "mag",
      symbol: {
        type: "simple-marker",
        color: "orange",
        outline: {
          color: "white",
        },
      },
      visualVariables: [
        {
          type: "size",
          field: "mag",
          stops: [
            {
              value: 2.5,
              size: "4px",
            },
            {
              value: 8,
              size: "40px",
            },
          ],
        },
      ],
    };

    /* === URL === */
    if (this.URL_USGS === "")
      this.URL_USGS =
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
    console.log(this.URL_USGS);
    /* === GEOJSON LAYER === */
    const geojsonLayer = new GeoJSONLayer({
      url: this.URL_USGS,
      copyright: "USGS Earthquakes",
      popupTemplate: template,
      renderer: renderer, //optional
    });

    /* === MAP === */
    const API_KEY =
      "AAPKfc7b189f70fb41499b4d7a6a03651b81rHnrb9zDNgOCG7VoX1_7eaIzazH01CyFqzU-YyGsw0CmTRPu4_ihVFyY6SoA9r5m";
    config.apiKey = API_KEY;

    const map = new Map({
      basemap: "topo-vector",
      layers: [geojsonLayer],
    });

    /* === COORDINATES AND ZOOM === */
    if (this.coordinates === "") {
      this.coordinates = [-102.552784, 23.634501];
    }
    const coor = this.coordinates;
    const view = new MapView({
      map: map,
      center: [coor[0], coor[1]],
      zoom: this.zoom,
      container: this.shadowRoot?.querySelector("#map"),
      ui: { components: ["attribution"] },
    });

    const zoom = new Zoom({ view: view });
    view.ui.add(zoom, { position: "top-left" });

    this.coordinates = [];
    this.requestUpdate();
  }

  createMapContainer() {
    let elemento = this.renderRoot?.querySelector("#map-content");
    elemento.innerHTML = `<div id="map"></div>`;
  }

  createModal() {
    const modal = this.shadowRoot.querySelector("#modal");
    modal.showModal();
  }

  closeModal() {
    const modal = this.shadowRoot.querySelector("#modal");
    modal.close();
    const mapComponent = this.shadowRoot.querySelector("#map");
    mapComponent.remove();
    this.requestUpdate();
  }

  render() {
    return html` <div>
      <div class="container">
        <button @click=${this.getMap} id="btn-map"><strong>Map</strong></button>
        <dialog id="modal">
          <div id="map-content"></div>
          <button @click=${this.closeModal} id="btn-close">
            <strong>X</strong>
          </button>
        </dialog>
      </div>
    </div>`;
  }
}

customElements.define("arcgis-map", ArcGISMap);
