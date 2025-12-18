import React from 'react';

import './ExploreMenu.css';
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
    return (
        <section id='explore_menu'>
            <div className="container">
                <div className="explore_menu_wrapper">
                    <div className="explore_menu_heading">
                        <h2>Explore our menu</h2>
                        <p>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience. One delicious meal of a time.</p>
                    </div>
                    <div className="explore_menu_list">
                        {
                            (menu_list.length > 0) && (
                                menu_list.map((item, index) => {
                                    return <div key={index} onClick={() => category === item.menu_name ? setCategory("all"): setCategory(item.menu_name)} className="explore_menu_item">
                                        <div className={`menu_item_img ${category === item.menu_name && "active"}`}>
                                            <img src={item.menu_image} alt="Menu Item Image" />
                                        </div>
                                        <h5>{item.menu_name}</h5>
                                    </div>
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExploreMenu