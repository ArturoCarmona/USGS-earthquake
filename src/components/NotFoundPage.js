import React from "react";
import NotFound from "../assets/img/404.png";

function NotFoundPage() {
  return (
    <div id="div-not-found">
      <img src={NotFound} alt="NotFound-img" id="img-not-found"></img>
    </div>
  );
}

export default NotFoundPage;
