import { LitElement, html, css } from "lit-element";
import "./ArcGIS-Map";
import Img404 from "../assets/img/Error 404.png";

export class USGSEarthquake extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      URL_USGS: { type: String },
      coordinates: { type: Array },
      dateIni: { type: String },
      dateFin: { type: String },
      inactive: { type: Boolean },
      errorData: { type: Boolean },
      selectOption: { type: String },
    };
  }

  static get styles() {
    return css`
      .usgs-map {
        justify-content: center;
        text-align: center;
      }
      @media (max-width: 912px) {
        #div-search-data {
          margin-top: 50%;
        }
      }
      @media (min-width: 913px) {
        #div-search-data {
          margin-top: 25%;
        }
      }
      #div-table {
        padding-bottom: 100px;
        min-height: calc(100%-80px);
      }
      #div-error {
        justify-content: center;
        margin-top: 15px;
      }

      @media (max-width: 667px) {
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          margin-left: 1%;
          margin-right: 1%;
          margin-top: 20px;
          margin-bottom: 20px;
        }
      }
      @media (min-width: 668px) {
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          margin-left: 15%;
          margin-right: 15%;
          margin-top: 20px;
          margin-bottom: 20px;
        }
      }
      td,
      th {
        border: 1px solid black;
        text-align: center;
        padding: 8px;
      }
      th {
        background-color: black;
        color: white;
      }

      tr:nth-child(even) {
        background-color: rgb(241, 231, 231);
      }
      tr:nth-child(odd) {
        background-color: white;
      }
      label {
        font-family: arial, sans-serif;
      }
      #input-date {
        font-family: arial, sans-serif;
        border: 2px solid black;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
        cursor: pointer;
      }
      #input-order-by {
        font-family: arial, sans-serif;
        border: 2px solid black;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
        cursor: pointer;
      }
      #btn-search {
        font-family: arial, sans-serif;
        background-color: rgb(167, 20, 167);
        color: white;
        width: 100px;
        height: 25px;
        margin: 15px;
        text-align: center;
        border: 1px solid rgb(167, 20, 167);
        border-radius: 2px;
        cursor: pointer;
      }
      img {
        width: 650px;
        height: 400px;
      }
      #search-table {
        margin: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.data = [];
    this.URL_USGS = "";
    this.coordinates = [];
    this.dateIni = "";
    this.dateFin = "";
    this.inactive = true;
    this.errorData = true;
    this.selectOption = "";
  }

  getData() {
    if (this.dateIni === "" && this.dateFin === "") {
      this.URL_USGS =
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02";
    } else if (this.selectOption === "") {
      this.URL_USGS = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.dateIni}&endtime=${this.dateFin}`;
    } else {
      this.URL_USGS = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.dateIni}&endtime=${this.dateFin}&orderby=${this.selectOption}`;
    }
    fetch(this.URL_USGS)
      .then((response) => {
        if (response.ok) {
          response.json().then((dataResponse) => {
            if (dataResponse.features.length === 0) {
              this.errorData = true;
              this.inactive = false;
              this.requestUpdate();
            } else {
              this.data = dataResponse.features;
              this.inactive = false;
              this.errorData = false;
              this.requestUpdate();
            }
          });
        } else if (response.status === 400) {
          console.log("Status 400");
          this.inactive = false;
          this.errorData = true;
          this.requestUpdate();
        }
      })
      .catch((error) => console.log("error: ", error));

    this.requestUpdate();
  }

  doChangeIni(e) {
    this.dateIni = e.target.value;
    this.requestUpdate();
  }

  doChangeFin(e) {
    this.dateFin = e.target.value;
    this.requestUpdate();
  }

  SearchTable() {
    let filter, found, table, tr, td, i, j;
    let input = this.shadowRoot.querySelector("#myInput");
    filter = input.value.toUpperCase();
    table = this.shadowRoot.querySelector("#myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          found = true;
        }
      }
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  changeOption(e) {
    this.selectOption = e.target.value;
    this.requestUpdate();
  }

  newSearch() {
    this.inactive = true;
    this.requestUpdate();
  }

  render() {
    return html` <div class="usgs-map">
      ${this.inactive
        ? html` <div id="div-search-data">
            <div>
              <label><strong>Date start</strong></label>
              <input
                type="date"
                id="input-date"
                @change="${this.doChangeIni}"
              />
            </div>
            <div>
              <label><strong>Date finish</strong></label>
              <input
                type="date"
                id="input-date"
                @change="${this.doChangeFin}"
              />
            </div>
            <div>
              <label for="order-by"><strong>Order by</strong></label>
              <select
                name="order-by"
                id="input-order-by"
                @change="${this.changeOption}"
              >
                <option value="default" selected>-- Choose one --</option>
                <option value="time">Time</option>
                <option value="magnitude">Magnitude</option>
              </select>
            </div>
            <div>
              <button @click=${this.getData} id="btn-search">
                <strong>Search data</strong>
              </button>
            </div>
          </div>`
        : this.errorData
        ? html`<div id="div-error">
            <div>
              <img src=${Img404} />
            </div>
            <div>
              <button @click=${this.newSearch} id="btn-search">
                <strong>New search</strong>
              </button>
            </div>
          </div>`
        : html` <div id="div-table">
            <div>
              <button @click=${this.newSearch} id="btn-search">
                <strong>New search</strong>
              </button>
            </div>
            <h3>Map complete</h3>
            <arcgis-map .URL_USGS=${this.URL_USGS}></arcgis-map>
            <div id="search-table">
              <label><strong>Search</strong></label>
              <input type="text" id="myInput" @keyup=${this.SearchTable} />
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Place</th>
                  <th>Magnitude</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody id="myTable">
                ${this.data.map((item) => {
                  return html`
                    <tr>
                      <td>${item.id}</td>
                      <td>${item.properties.place}</td>
                      <td>${item.properties.mag}</td>
                      <td>
                        <arcgis-map
                          .URL_USGS=${this.URL_USGS}
                          .coordinates=${item.geometry.coordinates}
                          .zoom=${13}
                        ></arcgis-map>
                      </td>
                    </tr>
                  `;
                })}
              </tbody>
            </table>
          </div>`}
    </div>`;
  }
}

customElements.define("usgs-earthquake", USGSEarthquake);
