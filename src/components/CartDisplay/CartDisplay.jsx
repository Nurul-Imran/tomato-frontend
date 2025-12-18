import React, { useContext } from 'react';

import './CartDisplay.css'
import { storeContext } from '../../context/storeContext';
import { url } from '../../utils/api';

const CartDisplay = () => {
    const { foodList, cartItems, removeToCart } = useContext(storeContext);
    return (
        <section id='cart_display'>
            <div className="container">
                {
                    cartItems && foodList && (Object.keys(cartItems).length > 0) ? (
                        <div className="cart_display_wrapper">
                            <table className="cart_display_list">
                                <thead>
                                    <tr>
                                        <th>items</th>
                                        <th>title</th>
                                        <th>price</th>
                                        <th>quantity</th>
                                        <th>Total</th>
                                        <th>remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    Object.keys(cartItems).map((key, index) => {
                                    const item = foodList.find((item) => item._id === key);
                                    if (!item) return null;
                                    return <tr key={index}>
                                            <td><img src={url+"/images/"+item.image} alt={item.name} /></td>
                                            <td>{item.name}</td>
                                            <td>${item.price}</td>
                                            <td>{cartItems[key]}</td>
                                            <td>${item.price * cartItems[key]}</td>
                                            <td>
                                                <span className='remove_item' onClick={() => removeToCart(item._id)}>x</span>
                                            </td>
                                    </tr>
                                    
                                    })
                                }
                                </tbody>
                            </table>
                        </div>

                    ): <h2 className='No_cart_item_heading'>No Cart Item Here. If You Want To Order Food, Then Fristly Add To Cart Food Sir.</h2>
                }
            </div>
        </section>
    )
}

export default CartDisplay