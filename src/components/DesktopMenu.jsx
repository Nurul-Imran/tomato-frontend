import React from "react";
import { Link } from "react-router-dom";

const DesktopMenu = ({activeMenu}) => {
  return (
    <>
      <ul className="menu">
        <li
          className={activeMenu === "home" ? "active" : ""}
          onClick={() => {
            setActiveMenu("home");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <Link to="/">home</Link>
        </li>
        <li className={activeMenu === "menu" ? "active" : ""}>
          <a href="#explore_menu">Menu</a>
        </li>
        <li className={activeMenu === "mobile-app" ? "active" : ""}>
          <a href="#download_app">mobile app</a>
        </li>
        <li className={activeMenu === "contact-us" ? "active" : ""}>
          <a href="#footer">contact us</a>
        </li>
      </ul>
    </>
  );
};

export default DesktopMenu;
