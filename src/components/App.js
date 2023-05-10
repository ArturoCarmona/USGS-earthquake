import "../styles/App.css";
import "../components/USGS-earthquake.js";
import "../components/ArcGIS-Map.js";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/Earthquake-Catalog"
            element={<usgs-earthquake></usgs-earthquake>}
          ></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
