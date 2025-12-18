import React, { useState } from 'react';
import './Home.css';
import Banner from '../../components/Banner/Banner';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import DownloadApp from '../../components/DownloadApp/DownloadApp';

const Home = () => {
    const [category, setCategory] = useState("all");
    return (
        <>
            <Banner />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <DownloadApp />
        </>
    )
}

export default Home