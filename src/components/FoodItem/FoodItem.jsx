import React, { useContext, useState } from 'react';

import './FoodItem.css';
import {assets} from '../../assets/assets'
import { storeContext } from '../../context/storeContext';
import { url } from '../../utils/api';

const FoodItem = ({foodItem}) => {
    const { addToCart, removeToCart, cartItems } = useContext(storeContext);
    const {_id, image, name, price, description} = foodItem;
    return (
        <div className='food_display_item'>
            <div className="food_item_img">
                <img src={`${url}/images/${image}`} alt="Food Image" />
                {(cartItems[_id] > 0) ? (
                    <div className="food_item_increment_decrement">
                        <img onClick={() => removeToCart(_id)} src={assets.remove_icon_red} alt="Remove Icon" />
                        <span>{cartItems[_id]}</span>
                        <img onClick={() => addToCart(_id)} src={assets.add_icon_green} alt="Add Icon" />
                    </div>
                ): (
                    <div className="food_item_count">
                        <img onClick={() => addToCart(_id)}  src={assets.add_icon_white} alt="Increment Icon" />
                    </div>
                )}
            </div>
            <div className="food_item_content">
                <div className="food_item_content_heading">
                    <h4>{name}</h4>
                    <img src={assets.rating_starts} alt="Rating Img" />
                </div>
                <p className='description'>{description}</p>
                <h3 className='price'>${price}</h3>
            </div>
        </div>
    )
}

export default FoodItem