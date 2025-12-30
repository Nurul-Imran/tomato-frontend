import React, { useContext } from "react";

import "./Cart.css";
import CartItemsDisplay from "../../components/CartDisplay/CartDisplay";
import CartTotal from "../../components/CartTotal/CartTotal";
import { storeContext } from "../../context/storeContext";

const Cart = () => {
  const { cartItems } = useContext(storeContext);
  const hasCartItems = cartItems && Object.keys(cartItems).length > 0;

  return (
    <div id="cart">
      <CartItemsDisplay />
      {hasCartItems && (
        <div className="cart_calculation_main">
          <div className="container">
            <div className="cart_calculation_main_wrapper">
              <CartTotal btnText="proceed to checkout" nevigateUrl="place-order" />
              <div className="cart_promo_main">
                <p>If you have a promo code. Enter it here</p>
                <div className="input_group">
                  <input type="text" placeholder="promo code" />
                  <button type="submit">submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
