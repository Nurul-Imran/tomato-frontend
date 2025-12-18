import React, { useContext } from 'react';

import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { storeContext } from '../../context/storeContext';

const FoodDisplay = ({category}) => {
    const { foodList } = useContext(storeContext);
    let foodDisplayCount = 1;
    let showFoodNullMsg = true;

    return (
        <section id="food_display">
            <div className="container">
                <div className="food_display_wrapper">
                    <h2>Top dishes near you</h2>
                    { (foodList && foodList.length > 0) ? (
                            <div className="food_display_list">
                                {foodList.map((item, index) => {
                                    if ((category === item.category || category === "all") && foodDisplayCount <= 12){
                                        if (category === "all") foodDisplayCount++
                                        showFoodNullMsg = false;
                                        return <FoodItem key={index} foodItem={item} />
                                    }
                                })}
                            </div>
                        ): <h4 style={{marginTop: "30px", color: "tomato"}}>Loading...
                            {showFoodNullMsg = false}
                        </h4> 
                    }
                    {showFoodNullMsg && <h4 style={{color: "tomato"}}>Upcoming. Please, select another category.</h4>}
                </div>
            </div>
        </section>
    )
}

export default FoodDisplay