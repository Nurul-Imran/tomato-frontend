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
    // More robust scroll spy: use getBoundingClientRect and run on scroll + resize
    const handleScroll = () => {
      const offset = window.innerHeight * 0.2; // 20% of viewport height
      const footerOffset = window.innerHeight * 0.5; // larger threshold for footer

      const menu = document.getElementById("explore_menu");
      const mobileApp = document.getElementById("download_app");
      const contact = document.getElementById("footer");

      // If sections aren't rendered yet, default to home
      if (!menu && !mobileApp && !contact) {
        setActiveMenu("home");
        return;
      }

      // Helper to get top distance from viewport (fallback to large positive number)
      const topOrLarge = (el) => (el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY);

      const menuTop = topOrLarge(menu);
      const mobileTop = topOrLarge(mobileApp);
      const contactTop = topOrLarge(contact);

      // Check in order of priority: contact -> mobileApp -> menu -> home
      if (contactTop <= footerOffset) {
        setActiveMenu("contact-us");
      } else if (mobileTop <= offset) {
        setActiveMenu("mobile-app");
      } else if (menuTop <= offset) {
        setActiveMenu("menu");
      } else {
        setActiveMenu("home");
      }
    };

    // Run once to initialize state and also on resize
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
