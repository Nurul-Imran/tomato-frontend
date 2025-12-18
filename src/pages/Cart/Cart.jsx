import React from "react";

import "./Cart.css";
import CartItemsDisplay from "../../components/CartDisplay/CartDisplay";
import CartTotal from "../../components/CartTotal/CartTotal";

const Cart = () => {
  return (
    <div id="cart">
      <CartItemsDisplay />
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
    </div>
  );
};

export default Cart;
