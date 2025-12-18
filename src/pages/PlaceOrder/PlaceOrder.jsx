import React, { useContext, useEffect, useState } from 'react';

import './PlaceOrder.css';
import { storeContext } from '../../context/storeContext';
import api from '../../utils/api';

const PlaceOrder = () => {
    const { foodList, cartItems, total, token } = useContext(storeContext);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        number: ''  
    });
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prevData) => ({...prevData, [name]: value}));
    }

    const handlePlaceOrder = async(e) => {
        e.preventDefault();
        const orderItems = [];
        foodList.map((item) => {
            if (cartItems[item._id]) {
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        });

        const orderData = {
            items: orderItems,
            address: data,
            amount: total + 2 // including delivery fee
        }

        const res = await api.post('/order/place', orderData, {headers: {authorization: `Bearer ${token}`}});
        if (res.data.success) {
            window.location.href = res.data.session_url;
        }else{
            alert("Failed to place order. Please try again.");
        }

    }
    return (
        <section id='placeOrder'>
            <div className="container">
                <div className="delivery_information">
                        <h2>Delivery Information</h2>
                        <form onSubmit={handlePlaceOrder} className='delivery_form' action="#" method="post">
                            <div className='address_part'>
                                <div className="input_group">
                                    <input type="text" name='firstName' value={data.firstName} onChange={handleChange} placeholder='First name' required />
                                    <input type="text" name='lastName' value={data.lastName} onChange={handleChange} placeholder='Last name' required />
                                </div>
                                <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='Enter Email Address' required />
                                <input type="text" value={data.street} onChange={handleChange} placeholder='Street' name='street' required />
                                <div className="input_group">
                                    <input type="text" name='city' value={data.city} onChange={handleChange} placeholder='City' required />
                                    <input type="text" name='state' value={data.state} onChange={handleChange} placeholder='state' required />
                                </div>
                                <div className="input_group">
                                    <input type="text" name='zipCode' value={data.zipCode} onChange={handleChange} placeholder='Zip code' required />
                                    <input type="text" name='country' value={data.country} onChange={handleChange} placeholder='Country' required />
                                </div>
                                <input type="text" name='number' value={data.number} onChange={handleChange} placeholder='Number' required />
                            </div>

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
                                <button type="submit" className="checkout_btn">proceed to payment</button>
                            </div>
                        </form>
                 </div>
            </div>
        </section>
    )
}

export default PlaceOrder