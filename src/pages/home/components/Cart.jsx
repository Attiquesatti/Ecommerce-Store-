import React, { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { FaTimes } from "react-icons/fa";
import Quantity from "./Quantity";
import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Cart = () => {

  const navigate = useNavigate()
  const { open, setOpen, cartdata, removeFromCart , quantity, calculateTotalPrice } = useContext(GlobalContext);

  // const calculateTotalPrice = () => {
  //   return cartdata.reduce((total, item) => total + (item.price * quantity[item.id] || 0), 0).toFixed(2);
  // };

  const handlecheckout = ()=>{
    if(cartdata==''){
      return;
    }
    navigate('/checkout')
    setOpen(false)
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden duration-300">
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setOpen(false)}
          />
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex transition duration-300">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col py-6 bg-white shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-xl font-semibold text-black">
                    Cart Details
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Close</span>
                    <FaTimes />
                  </button>
                </div>
                <div className="mt-4 px-4">
                  <p className="ml-2 text-gray-400">Results</p>
                </div>
                <div className="mt-4 px-4 h-full overflow-auto">
                  {cartdata
                    .reduce((acc, item) => {
                      if (
                        !acc.find((existingItem) => existingItem.id === item.id)
                      ) {
                        acc.push(item);
                      }
                      return acc;
                    }, [])
                    .map((product) => (
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.image}
                              alt={product.image}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <div className="w-[67%]">
                                  <h3>{product.title}</h3>
                                </div>
                                <div className="w-[33%]">
                                  <p className="ml-3 text-sm">
                                    {`$${
                                    product.price
                                  } x $${quantity[product.id]} `}
                                  {/* = $${
                                    product.price * quantity[product.id]
                                  }`} */}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.category}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-800 font-bold">
                                Qty : {quantity[product.id]}{" "}
                              </p>
                              <Quantity id={product.id} type={"sidebar"} />
                              <div></div>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() => removeFromCart(product.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))}
                </div>
                <div className="relative flex justify-between items-center p-3">
                  <h1 className="text-xl font-semibold text-black">Total:</h1>
                  <span className="text-black text-xl font-semibold">
                    ${calculateTotalPrice()}
                  </span>
                </div>
                <div className="mx-3">
                  <button className="flex items-center w-full justify-center px-10 py-2 bg-gray-800 text-white rounded-lg font-semibold" onClick={handlecheckout}>
                    Checkout
                    <MdOutlineShoppingCartCheckout className="ms-1 text-xl"/>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Cart;
