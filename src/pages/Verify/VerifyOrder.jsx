import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import api from '../../utils/api.js';
import './VerifyOrder.css';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId') || '';
    
    const verifyPayment = async () => {
        try {
            const res = await api.post('/order/verify', {success, orderId});
            if (res.data.success) {
                navigate('/order');
            }else{
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="loading"></div>
        </div>
    )
}

export default Verify;