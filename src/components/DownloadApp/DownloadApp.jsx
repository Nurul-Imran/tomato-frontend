import React from "react";

import "./DownloadApp.css";
import { assets } from "../../assets/assets";


const DownloadApp = () => {
  return (
    <section id="download_app">
      <div className="container">
        <div className="download_app_wrapper">
          <h2>For Better Experience Download Tomato App</h2>
          <div className="download_app_images">
            <a href="#"><img src={assets.play_store} alt="Play Store Image" /></a>
            <a href="#"><img src={assets.app_store} alt="App Store Image" /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
