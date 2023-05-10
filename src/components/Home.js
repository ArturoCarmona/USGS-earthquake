import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div>
      <div id="home">
        <h1>USGS API´s</h1>
        <p id="home-text">
          USGS provide science about the natural hazards that threaten lives and
          livelihoods, the water, energy, minerals, and other natural resources,
          the health of our ecosystems and environment, and the impacts of
          climate and land-use change.
        </p>
        <h3>API available</h3>
        <ul>
          <li>
            <a href="/Earthquake-Catalog" id="item-list-home">
              🌎 Earthquake Catalog 🌎
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
