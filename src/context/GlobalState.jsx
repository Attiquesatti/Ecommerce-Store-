import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creating the context 
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([])
  const [getsingleproduct, setgetSingleproduct]= useState(null)
  const [open, setOpen] = useState(false);
  const [cartdata, setCartdata]=useState([])
  const [count, setCount]=useState(0)
  const [addedItems, setAddedItems] = useState([]);
  const [quantity, setQuantity]=useState({})
  const [billdata, setBilldata] = useState([]);

  const calculateTotalPrice = () => {
    return cartdata.reduce((total, item) => total + (item.price * quantity[item.id] || 0), 0).toFixed(2);
  };

  const getProducts = () => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const getCategories = () => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => {
        
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const getCatogoryData = (category) => {
    axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
        // console.log('Electronics data:', res.data); // Log the fetched data
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const getSingleProductData = (id) => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setgetSingleproduct(res.data);
        setLoading(false);
        // console.log('Electronics data:', res.data); // Log the fetched data
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handlecartdata = (id) => {
    if (addedItems.includes(id)) {
      return; // Exit early if item is already added
    }
    setOpen(true)
    setCartdata((prevCartdata) => [...prevCartdata, getsingleproduct]);
    setAddedItems((prevAddedItems) => [...prevAddedItems, id]);
    setCount((prev) => prev + 1);
    if(quantity>=1 ){
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0 )
    }))}
    else{
      setQuantity((prevQuantities) => ({
        ...prevQuantities,
        [id]: (prevQuantities[id] || 0 + 1)})) 
    };
  };
  

  // const removeFromCart = (id) => {
  //   setCartdata((prevCartdata) => prevCartdata.filter(product => product.id !== id))
  //   setCount(prev=>prev-1);
  // };

  const removeFromCart = (id) => {
    setCartdata((prevCartdata) => prevCartdata.filter(product => product.id !== id));
    setCount(prev => prev - 1);
    setAddedItems((prevAddedItems) => prevAddedItems.filter(itemId => itemId !== id));
    setQuantity((prevQuantities) => {
      const { [id]: _, ...newQuantities } = prevQuantities; // Remove the id from quantities
      return newQuantities;
    });
  };
  

  const increaseQuantity = (Id) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [Id]: (prevQuantities[Id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (Id) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [Id]: Math.max((prevQuantities[Id] || 0) - 1, 0),
    }));
  };

  useEffect(() => {
    getProducts();
    // getCategories();
  }, []);

  const Loading=()=>{
    return(
    <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
      <div class="flex space-x-2 animate-pulse">
          <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
      </div>
    </div>
    )
  }

  return (
    <GlobalContext.Provider value={{ products, loading, error , categories, getCatogoryData, getProducts, getCategories, getSingleProductData, getsingleproduct, Loading, open, setOpen, cartdata, setCartdata, count, setCount, removeFromCart, addedItems, setAddedItems, getProducts,quantity, setQuantity, increaseQuantity, decreaseQuantity, handlecartdata, calculateTotalPrice, billdata, setBilldata}}>
      {loading ? Loading() : children}
    </GlobalContext.Provider>
  );
};
