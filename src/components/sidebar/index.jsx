import React, { useState, useContext, useEffect } from "react";
import { FaCartPlus, FaGem, FaTshirt, FaCrown, FaBars, FaPlus, FaArrowLeft, FaProductHunt } from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalState";
import ProductModal from "../../pages/home/components/ProductModal";
import { FaElevator } from "react-icons/fa6";

const Sidebar = () => {
  const { getProducts, getCatogoryData, categories, getCategories, } = useContext(GlobalContext);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleAllproducts = () => {
    getProducts();
  }

  const handleGetData = (category) => {
    getCatogoryData(category);
  };

  const getCategoryIcon = (categoryname) => {
    switch (categoryname) {
      case "electronics":
        return <FaElevator />;
      case "jewelery":
        return <FaGem />;
      case "men's clothing":
        return <FaTshirt />;
      case "women's clothing":
        return <FaCrown />;
      case "settings":
        return <FaBars />;
      default:
        return <FaCartPlus />;
    }
  };

  const handleAddProductClick = () => {
    setIsModalOpen(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  useEffect(()=>{
       if(window.innerWidth<992){
        setSidebarOpen(false)
       }else{
        setSidebarOpen(true)
       }
  },[window.innerWidth])


  return (
    <>
      <div className={`relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700
                    p-4 shadow-xl font-header-family duration-300
                    ${sidebarOpen ? "w-[300px]" : "w-[80px]"} `}>
        <FaArrowLeft
          className={`bg-gray-700 text-white text-xl rounded-full absolute right-2 top-4 border-white cursor-pointer p-1 ${!sidebarOpen && "rotate-180 right-6"}`}
          onClick={() => toggleSidebar()}
        />
        <div className="mb-2 p-4">
          <h5 className={`block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900 font-header-family ${sidebarOpen ? "scale-100" : "scale-0"} `}>
            Categories
          </h5>
        </div>
        
        <nav className={`flex flex-col gap-1 p-2 font-sans text-base font-normal text-gray-700 ${sidebarOpen ? "min-w-[240px]" : "min-w-[80px]"}`}>
          <div
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            onClick={handleAllproducts}
          >
            <div className="grid place-items-center mr-4">
              <FaProductHunt />
            </div>
            <button className={`${sidebarOpen ? "block" : "hidden"}`}>All Products</button>
          </div>
          {categories.map((item) => (
            <div
              key={item}
              role="button"
              tabIndex="0"
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
              onClick={() => handleGetData(item)}
            >
              <div className="grid place-items-center mr-4">
                {getCategoryIcon(item)}
              </div>
              <button className={`${sidebarOpen ? "block" : "hidden"}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </div>
          ))}
          <div
            role="button"
            tabIndex="0"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            onClick={handleAddProductClick}
          >
            <div className="grid place-items-center mr-4">
              <FaPlus />
            </div>
            <button className={`${sidebarOpen ? "block" : "hidden"}`}>Add new product</button>
          </div>
        </nav>
      </div>
      {isModalOpen && <ProductModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Sidebar;
