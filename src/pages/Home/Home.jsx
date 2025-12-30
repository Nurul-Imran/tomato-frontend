import './Home.css';
import Banner from '../../components/Banner/Banner';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import DownloadApp from '../../components/DownloadApp/DownloadApp';

const Home = () => {
    return (
        <>
            <Banner />
            <ExploreMenu />
            <FoodDisplay />
            <DownloadApp />
        </>
    )
}

export default Home