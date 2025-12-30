import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Error from './pages/Error/Error';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Footer from './components/Footer/Footer';
import { storeContext } from './context/storeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Verify from './pages/Verify/VerifyOrder.jsx';
import Order from './pages/Order/Order';
import Foods from './pages/Foods/Foods.jsx';

const App = () => {
  const { isOpenSignUp, setIsOpenSignUp } = useContext(storeContext)
  return (
    <>
      <ToastContainer position='top-left' autoClose={2500} />
      { isOpenSignUp && <Signup setIsOpenSignUp={setIsOpenSignUp} /> }
      <Navbar setIsOpenSignUp={setIsOpenSignUp} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/order' element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        } />
        <Route path='/foods' element={<Foods />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App