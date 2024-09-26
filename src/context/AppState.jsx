import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from 'axios';
// for pop of successfully registeration 
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {
  // const url = "http://localhost:1000/api";
  const url ="https://primepicks-2.onrender.com";
  const [products, setProducts] = useState([]);
  //to store and set token comming from login page
  
  const [token,setToken]=useState([]);
  const [isAuthenticated,setIsAuthenticated]=useState(false);

  // -- for filter
  const[filteredData,setFilteredData]=useState([]);
  const [user,setUser] =useState();
  const [cart,setCart] =useState([]);
  const [reload,setReload] =useState(false);
  const[userAddress,setUserAddress]=useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`,
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });

      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);//-- filter
      userProfile();
      getAddress();
    };
    fetchProduct();
    userCart();
  },[token,reload]);//-- token for filter

//--- taking token from local storage
  useEffect(()=>{
    let lstoken =localStorage.getItem("token");
    if(lstoken)
    {
       setToken(lstoken);
       setIsAuthenticated(true);
    }
  },[]);

  //----register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }

    );

    // code for pop for successfully registration
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce
      
    });
    // alert(api.data.message);
    return api.data;
  };
  // login user
  const login = async ( email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      {  email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }

    );

    // code for pop for successfully Login
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log("use login",api.data.message);
    setToken(api.data.token);
    setIsAuthenticated(true);
    // getting the token is the application localstorage
    localStorage.setItem("token",api.data.token);
    return api.data;
  };
  // log out
  const logout=()=>{

     setIsAuthenticated(false);
     setToken(" ")
     localStorage.removeItem('token');

     toast.success("logout Successfully...!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  // user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`,//getting data for backend
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth":token// because authentication in backen routes is require
        },
        withCredentials: true,
      });

    // console.log(api.data);
    setUser(api.data.user)
  };

// -- add to cart
const addToCart = async (productId,title,price,qty,imgSrc) => {
  const api = await axios.post(`${url}/cart/add`,
    {productId,title,price,qty,imgSrc},
    {
      headers: {
        "Content-Type": "Application/json",
        Auth:token,
      },
      withCredentials: true,
    });
    setReload(!reload)
    // console.log('Adding to cart:', productId, title, price, qty, imgSrc);
  // console.log("My cart",api);
  toast.success(api.data.message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce
    
  });
};

// -- user Cart
const userCart = async () => {
  const api = await axios.get(`${url}/cart/user`,//getting data for backend
    {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token// because authentication in backen routes is require
      },
      withCredentials: true,
    });
  setCart(api.data.cart);
  // setUser(api.data.user)
};

//  --qty
const decreaseQty = async (productId, qty) => {
  const api = await axios.post(
    `${url}/cart/--qty`,
    { productId,qty},
    {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    }
  );
  setReload(!reload);
  // console.log("decrease cart items ",api);
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
  
  //  setCart(api.data.cart);
  //  setUser("user cart ",api);
};

  // ----- remove Item from cart
  const removeFromCart = async (productId) => {
    console.log("going for the removal of item",productId);
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };
//  clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  //  Add Shipping Address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };
   // get User latest address
   const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("user address ", api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };

  // get User order
  const userOrder = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("user order ", api.data);
    setUserOrder(api.data)
    
  };
console.log("user order = ", userOrder);
 
  return (
    <AppContext.Provider value={{ 
      products, 
      register, 
      login ,
      token,
      url,
      isAuthenticated,
      setIsAuthenticated,
      filteredData,
      setFilteredData,
      logout,
      user,
      addToCart,
      cart,
      decreaseQty,
      removeFromCart,
      clearCart,
      shippingAddress,
      userAddress,
      // userOrder,
      }}>
      {props.children}
      </AppContext.Provider>
  )
}
export default AppState;