import React from "react";
import "./Banner.css";

import { assets } from '../../assets/assets';

const Banner = () => {
  return (
    <section id="banner">
      <div className="container">
        <div className="banner_wrapper" style={{background: `url('${assets.header_img}')`}}>
          <div className="banner_content">
            <h1>
              <span>Order your</span> favourite food here
            </h1>
            <p>
              Order your favourite food here Choose from a diverse menu
              featuring a delectable array of dishes crafted with the finest
              ingredients and culinary expertise. Our mission is to satisfy your
              cravings and elevate your dining experience. One delicious meal of
              a time.
            </p>
            <button>view menu</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
