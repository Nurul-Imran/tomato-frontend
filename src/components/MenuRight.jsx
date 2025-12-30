import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { HiOutlineLogout } from "react-icons/hi";
import { BsCart2 } from "react-icons/bs";
import { toast } from "react-toastify";
import { useContext } from "react";
import { storeContext } from "../context/storeContext";

const MenuRight = ({activeMenu, setActiveMenu, setIsOpenSignUp, isSignupButtonActive}) => {
  const { setToken, cartItems } = useContext(storeContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    setIsOpenSignUp(true);
    isSignupButtonActive();
  } 
  return (
    <div className="menu_right">
      <div className="search_icon">
        <img src={assets.search_icon} alt="Search Icon" />
      </div>
      {
        localStorage.getItem("token") && (
          <div className="cart_icon_box">
            <Link
              to="/cart"
              className={activeMenu === "cart" ? "active" : ""}
              onClick={() => setActiveMenu("cart")}
            >
              <img src={assets.basket_icon} alt="Cart Icon" />
            </Link>
            {Object.keys(cartItems).length > 0 && <div className="dot"></div>}
          </div>
        )
      }
      {localStorage.getItem("token") ? (
        <div className="profile">
          <img
            className="profile_icon"
            src={assets.profile_icon}
            alt="profile icon"
          />
          <div className="profile_dropdown">
            <div
              className="item logout"
              onClick={() => {
                setToken(null);
                localStorage.removeItem("token");
                toast.success("Logout Successfully.");
              }}
            >
              <div className="icon">
                <HiOutlineLogout />
              </div>
              <span>logout</span>
            </div>
            <div onClick={() => navigate('/order')} className="item order">
              <div className="icon">
                <BsCart2 />
              </div>
              <span>order</span>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={handleSignUp}>Sign in</button>
      )}
    </div>
  );
};

export default MenuRight;
