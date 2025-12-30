import { useContext, useEffect, useState } from 'react';

import api from '../../utils/api';
import './Order.css';
import { storeContext } from '../../context/storeContext';
import { assets } from '../../assets/assets';


function Order() {
    const { token } = useContext(storeContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);

    let mounted = true;
    const fetchOrders = async () => {
        if (!mounted) return;
            setLoading(true);
            setError(null);
        try {
            const res = await api.get('/order/user-orders', {headers: {authorization: `Bearer ${token}`}});
            setOrders(res.data.orders);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to load orders' );
        } finally {
            setLoading(false);
        }    
    };

    useEffect(() => {
        if (!token) return; 

        fetchOrders();
        return () => { mounted = false; }
    }, [])
    
    return (
        <div id='orders'>
            <div className='container'>
                <div className="order_wrapper">
                    <h3>my orders</h3>
                    {loading && <p>Loading orders...</p>}
                    {error && <p className='error'>{error}</p>}
                    {orders.length === 0 && <p>No orders yet.</p>}
                    <div className='orders_list'>
                        {orders.length > 0 && orders.map((order, index) => {
                            let totalItems = 0;
                            return <div className='each_order' key={index}>
                                <h4 className='order_time'>
                                    {
                                        new Date(order.createdAt).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                    }
                                </h4>
                                <div className="order_details">
                                    <img src={assets.parcel_icon} alt="Parcel Icon Image" />
                                    <span 
                                        className={`food_titles ${expandedOrder === index ? 'expanded' : ''}`}
                                        onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
                                    >
                                        {order.items.map((item, index) => {
                                            totalItems += item.quantity;
                                            if (index === (order.items.length - 1)) return item.name + ' x ' + item.quantity;
                                            return item.name + ' x ' + item.quantity + ", "
                                        })}
                                    </span>
                                    <span className='total'>${order.amount}</span>
                                    <span className="total_items">items: {totalItems}</span>
                                    <span className="status">{order.status}</span>
                                    <button onClick={fetchOrders} className='track_btn'>track order</button>
                                </div>
                            </div>

                        })}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Order;