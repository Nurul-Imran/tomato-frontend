import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { storeContext } from '../context/storeContext'

const ProtectedRoute = ({children}) => {
    const { token } = useContext(storeContext);
    return token ? children : <Navigate to="/" replace />
}

export default ProtectedRoute