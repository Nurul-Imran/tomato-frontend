import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { ImCross } from "react-icons/im";

import { assets } from "../../assets/assets";
import "./Navbar.css";
import { storeContext } from "../../context/storeContext";
import DesktopMenu from "../DesktopMenu";
import MenuRight from "../MenuRight";

const Navbar = ({ setIsOpenSignUp }) => {
  const { token } = useContext(storeContext);
  const [activeMenu, setActiveMenu] = useState("home");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sideMenuClosing, setSideMenuClosing] = useState(false);

  const sideMenuRef = useRef(null); //  Reference for side menu

  const handleSideMenuClose = () => {
    setSideMenuClosing(true);
    setTimeout(() => setIsSideMenuOpen(false), 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect click outside of the side menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        handleSideMenuClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight * 0.2; // 20% of screen height
      const footerOffset = window.innerHeight * 0.5; // detect footer earlier

      const menu = document.getElementById("explore_menu");
      const mobileApp = document.getElementById("download_app");
      const contact = document.getElementById("footer");

      if (!menu || !mobileApp || !contact) return;

      if (scrollY >= contact.offsetTop - footerOffset) {
        setActiveMenu("contact-us");
      } else if (scrollY >= mobileApp.offsetTop - offset) {
        setActiveMenu("mobile-app");
      } else if (scrollY >= menu.offsetTop - offset) {
        setActiveMenu("menu");
      } else {
        setActiveMenu("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {}, [token]);

  const isSignupButtonActive = () => {
    setIsSideMenuOpen(false);
  }

  return (
    <nav id="nav" className={`${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="nav_wrapper">
          <div className="logo">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Logo"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              />
            </Link>
          </div>
          <DesktopMenu activeMenu={activeMenu} />
          <MenuRight isSignupButtonActive={isSignupButtonActive}  activeMenu={activeMenu} setActiveMenu={setActiveMenu} setIsOpenSignUp={setIsOpenSignUp} />
          {/* Mobile Side Menu */}
          <div className="side_menu_bar">
            <IoMenu
              onClick={() => {
                setSideMenuClosing(false);
                setIsSideMenuOpen(true);
              }}
            />
            {isSideMenuOpen && (
              <div
                ref={sideMenuRef}
                className={`side_menu ${sideMenuClosing ? "closed" : "opened"}`}
              >
                <DesktopMenu activeMenu={activeMenu} />
                <MenuRight isSignupButtonActive={isSignupButtonActive} activeMenu={activeMenu} setActiveMenu={setActiveMenu} setIsOpenSignUp={setIsOpenSignUp} />
                <div className="cross">
                  <ImCross onClick={handleSideMenuClose} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
