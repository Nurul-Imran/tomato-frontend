import React, { useState, useContext } from 'react';

import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { storeContext } from '../../context/storeContext';
import './Foods.css';

const Foods = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { foodList } = useContext(storeContext);

    // Get unique categories from foodList
    const categories = ['all', ...new Set(foodList.map(food => food.category))];

    return (
        <div>
            <div className="search_container">
                <div className="container">
                    <input
                        type="text"
                        placeholder="Search for food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search_input_foods"
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div className="category_filter_container">
                <div className="container">
                    <div className="category_filter">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter_btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <FoodDisplay searchTerm={searchTerm} selectedCategory={selectedCategory} />
        </div>
    )
}

export default Foods