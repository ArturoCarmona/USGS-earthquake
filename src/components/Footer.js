import React from "react";
import "../styles/Footer.css";
import Instagram from "../assets/img/instagram.png";
import Facebook from "../assets/img/facebook.png";
import Linkedin from "../assets/img/linkedin.png";
import GitHub from "../assets/img/github.png";

function Footer() {
  return (
    <div id="footer">
      <div className="Row">
        <div className="Col">
          <a
            href="https://www.instagram.com/gaboturo/"
            target={"_blank"}
            rel="noreferrer"
          >
            <img src={Instagram} alt="img" />
          </a>
          <a
            href="https://m.me/gabriel.arturo.52"
            target={"_blank"}
            rel="noreferrer"
          >
            <img src={Facebook} alt="img" />
          </a>
          <a
            href="https://github.com/ArturoCarmona"
            target={"_blank"}
            rel="noreferrer"
          >
            <img src={GitHub} alt="img" />
          </a>
          <a
            href="https://www.linkedin.com/in/garturogc/"
            target={"_blank"}
            rel="noreferrer"
          >
            <img src={Linkedin} alt="img" />
          </a>
        </div>
      </div>
      <div className="copy">
        <p>&copy; All rights reserviced</p>
      </div>
    </div>
  );
}

export default Footer;
