import React, { useContext, useEffect, useState } from 'react';

import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { storeContext } from '../../context/storeContext';

const FoodDisplay = ({ searchTerm = '', selectedCategory = null }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { foodList, category } = useContext(storeContext);

    // Use selectedCategory prop if provided, otherwise use context category
    const activeCategory = selectedCategory !== null ? selectedCategory : category;

    // Determine page size based on window width: mobile (8), tablet (12), desktop (16)
    const getPageSize = (width) => {
        if (width < 768) return 8;      // mobile
        if (width < 992) return 12;     // tablet
        return 16;                       // desktop
    };

    const [pageSize, setPageSize] = useState(() => getPageSize(window.innerWidth));
    const [pageIndex, setPageIndex] = useState(0);
    let showFoodNullMsg = true;

    useEffect(() => {
        let timer;
        if (foodList.length > 0) {
            setFoods(foodList);
            setLoading(false);
            setError(null);
        } else {
            setFoods([]);
            setError(null)
            // show loading briefly while data may still arrive
            setLoading(true);
            timer = setTimeout(() => setLoading(false), 800);
        }
        return () => clearTimeout(timer);
    }, [foodList, category]);

    // Update pageSize on resize (mobile: 8, tablet: 12, desktop: 16)
    useEffect(() => {
        const onResize = () => {
            const newSize = getPageSize(window.innerWidth);
            setPageSize(prev => {
                if (prev !== newSize) return newSize;
                return prev;
            });
            setPageIndex(0);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // reset page when filters/search change
    useEffect(() => {
        setPageIndex(0);
    }, [searchTerm, selectedCategory]);

    // useEffect(() => {}, [category, foodList])
    return (
        <section id="food_display">
            <div className="container">
                <div className="food_display_wrapper">
                    <h2>Top dishes near you</h2>
                    {loading && <div className="loading_state">
                        <div className="loading_spinner"></div>
                        <p>Preparing today's popular dishes...</p>
                    </div>}
                    {error && <span>{error}</span>}
                    { (foods && foods.length > 0) && (
                            <>
                            <div className="food_display_list">
                                {(() => {
                                    const filtered = foods.filter(item => {
                                        const matchCategory = activeCategory === item.category || activeCategory === "all";
                                        const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                                        return matchCategory && matchSearch;
                                    });
                                    if (filtered.length > 0) showFoodNullMsg = false;
                                    // calculate pagination slice
                                    const start = pageIndex * pageSize;
                                    const end = start + pageSize;
                                    const toShow = filtered.slice(start, end);
                                    return toShow.map((item, index) => <FoodItem key={start + index} foodItem={item} />);
                                })()}
                            </div>

                            {/* Pagination controls for limited view */}
                            {(() => {
                                const filteredCount = foods.filter(item => {
                                    const matchCategory = activeCategory === item.category || activeCategory === "all";
                                    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                                    return matchCategory && matchSearch;
                                }).length;
                                if (filteredCount <= pageSize) return null;
                                const maxPage = Math.ceil(filteredCount / pageSize) - 1;
                                return (
                                    <div className="pagination_controls">
                                        <button className="page_btn" onClick={() => setPageIndex(p => Math.max(0, p - 1))} disabled={pageIndex === 0}>Prev</button>
                                        <span className="page_info">Page {pageIndex + 1} of {maxPage + 1}</span>
                                        <button className="page_btn" onClick={() => setPageIndex(p => Math.min(maxPage, p + 1))} disabled={pageIndex === maxPage}>Next</button>
                                    </div>
                                )
                            })()}
                            </>
                        ) 
                    }
                    {!loading && showFoodNullMsg && <div className="no_food_message">
                        <h4>No Items Found</h4>
                        <p>We couldn't find any dishes for your selection. Try a different category or search term.</p>
                    </div>}
                </div>
            </div>
        </section>
    )
}

export default FoodDisplay