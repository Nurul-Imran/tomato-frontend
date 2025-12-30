import { createContext, useState } from "react";
import api from "../utils/api";
import { useEffect } from "react";

// Create Context
export const storeContext = createContext();


const StoreContextProvider = ({children}) => {
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [cartItems, setCartItems] = useState({});
    const [total, setTotal] = useState(0);
    const [foodList, setFoodList] = useState([]);
    const [category, setCategory] = useState("all");

    
    // AddToCart
    const addToCart = async(id) => {
        if (token) {
            try {
                const res = await api.post('/cart/add', {id}, {headers: {authorization: `Bearer ${token}`}});
                console.log(res.data.message);
                fetchCartItems();
            } catch (error) {
                console.error(error);
            }
        }else{
            setIsOpenSignUp(true);
        }
    }

    // RemoveToCart
    const removeToCart = async(id) => {
        try {
            const res = await api.post('/cart/remove', {id}, {headers: {authorization: `Bearer ${token}`}});
            fetchCartItems();
            console.log(res.data.message);
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch Cart Items
    const fetchCartItems = async() => {
        if (token) {
            try {
                const res = await api.get('/cart/items', {headers: {authorization: `Bearer ${token}`}});
                setCartItems(res.data.cartData);
            } catch (error) {
                console.error(error)
            }
        }
    }

    const contextValue = {
        foodList,
        cartItems,
        addToCart,
        removeToCart,
        total,
        setTotal,
        token,
        setToken, 
        isOpenSignUp, 
        setIsOpenSignUp,
        category,
        setCategory
    }

    const loadFoodItems = () => {
        api.get('/food/display')
         .then((res) => {
            setFoodList(res.data.data);
         })
         .catch((err) => {
            console.error(err);
         })
    }

    // Calculate Total
    useEffect(() => {
        if (!foodList || foodList.length === 0) return; 

        const total = Object.keys(cartItems).reduce((sum, key) => {
            const item = foodList.find(item => item._id === key);
            if (!item) return null;
            return sum + (item.price * cartItems[key]);
        }, 0);
        setTotal(total);

    }, [cartItems, foodList]);

    useEffect(() => {
        loadFoodItems();
        fetchCartItems();
    }, [token])

    return <storeContext.Provider value={contextValue}>
        {children}
    </storeContext.Provider>
};

export default StoreContextProvider;