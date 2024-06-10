import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalState"; 
import Cart from "./Cart";

const Hero = () => {
  const { products, open , sidebarOpen} = useContext(GlobalContext); 
  const navigate = useNavigate();

  const handleSingleProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className= {`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 transition-opacity duration-300 ${!sidebarOpen ? 'grid-cols-1' : ''}`} >
        {products.map((product) => (
          <div
            key={product.id}
            className="max-w-sm rounded-s-lg overflow-hidden shadow-lg m-4 font-header-family hover:scale-110 transition duration-300"
            onClick={() => handleSingleProduct(product.id)}
          >
            <div className="h-64 w-full overflow-hidden flex justify-center items-center transition">
              <img
                className="object-center object-cover h-full"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="text-center py-8 sm:py-6">
              <p className="text-xl text-gray-700 font-bold mb-2">
                {product.title ? product.title.slice(0, 20) : ""}
              </p>
              <p className="text-base text-gray-500 font-medium mb-1">
                Price:{" "}
                <span className="text-gray-700 font-bold">
                  ${product.price}
                </span>
              </p>
              <p className="text-base text-gray-500 font-medium mb-1">
                Category:{" "}
                <span className="text-gray-700 font-semibold capitalize">
                  {product.category}
                </span>
              </p>
              <p className="text-base text-gray-500 font-medium">
                Rating:{" "}
                <span className="text-gray-700 font-semibold">
                  {product.rating.rate}
                </span>{" "}
                (
                <span className="text-blue-700 font-semibold">
                  {product.rating.count} reviews
                </span>
                )
              </p>
            </div>
          </div>
        ))}
         {open && (
           <div>
             <Cart />
          </div>
      )}
      </div>
    </>
  );
};

export default Hero;
