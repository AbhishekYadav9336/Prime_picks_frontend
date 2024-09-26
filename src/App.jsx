import React, { useContext } from 'react'
import AppContext from './context/AppContext';
import ShowProduct from './components/product/ShowProduct';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from './components/product/ProductDetail';
import Navbar from './components/Navbar.jsx';
import SearchProduct from './components/product/SearchProduct.jsx';
import Register from './components/user/Register.jsx';
// after i react toastify we can import these statement
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './components/user/Login.jsx';
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from './components/Address.jsx';
import Checkout from './components/Checkout.jsx';
  const App = () => {
  // const {data}= useContext(AppContext)
  return (
    
     <Router>
     <Navbar/>
     <ToastContainer />
     <Routes>
     <Route path="/" element={<ShowProduct />} />
     <Route path="/product/search/:term" element={<SearchProduct />} />
     <Route path="/product/:id" element={<ProductDetail />} />
     <Route path="/register" element={<Register/>} />
     <Route path="/login" element={<Login/>} />
     <Route path="/profile" element={<Profile/>} />
     <Route path="/cart" element={<Cart/>} />
     <Route path="/shipping" element={<Address/>} />
     <Route path="/checkout" element={<Checkout/>} />
     </Routes>
    </Router> 
  );
};

export default App;