import React, { useContext } from "react";
import "./CartTotal.css";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";

const CartTotal = ({btnText, nevigateUrl}) => {
    const { total } = useContext(storeContext);
    const handleCheckout = () => {
        if (total === 0) {
            return toast.warning("Before Proceed To Checkout button, you have to add food on cart")
        }
        return;
    }
    return (
        <div className="cart_total_main">
            <h2>Cart Total</h2>
            <div className="subTotal">
                <span>Subtotal</span>
                <span>${total}</span>
            </div>
            <div className="delivery_free">
                <span>Delivery free</span>
                <span>${ total > 0 ? "2" : "0"}</span>
            </div>
            <div className="total">
                <span>total</span>
                <span>${ total > 0 ? (total + 2) : "0"}</span>
            </div>
            <Link onClick={handleCheckout} to={total > 0 ? `/${nevigateUrl}` : '/'} className="checkout_btn">{btnText}</Link>
        </div>
    );
};

export default CartTotal;
