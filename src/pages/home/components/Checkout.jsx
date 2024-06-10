import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import Cart from "./Cart";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaAt, FaFedex, FaGlobe, FaRegCreditCard } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import Ordereceipt from "./Ordereceipt";

const Checkout = () => {

    const {cartdata, quantity , open , calculateTotalPrice, billdata, setBilldata }=useContext(GlobalContext)

    const [openreceipt, setopenreceipt]=useState(false) 

    const [checkoutform, setCheckoutform]=useState({
      email:"",
      cardholdername:"",
      carddetails:{
        cardnumber:"",
        month:"",
        CVV:""
      },
      billingaddress:{
        Address:"",
        city:"",
        zip:""}
    })

    const [shippingMethod, setShippingMethod] = useState("standard"); // State to track selected shipping method
    const shippingCosts = {
      standard: 8.00,
      fedex: 15.00
    };

    const handleShippingChange = (e) => {
      setShippingMethod(e.target.value);
    };

    const handlechange = (e) => {
      const { name, value } = e.target;
  
      // If the input field is directly under checkoutform
      if (name in checkoutform) {
        setCheckoutform({
          ...checkoutform,
          [name]: value
        })
      }
      else {
        // If the input field is nested inside carddetails or billingaddress
        const [outerKey, innerKey] = name.split('.');
        setCheckoutform({
          ...checkoutform,
          [outerKey]: {
            ...checkoutform[outerKey],
            [innerKey]: value
          }
        });
      }
      }

      const shipping = (cartdata.reduce((total, item) => total + item.price * quantity[item.id], 0) + shippingCosts[shippingMethod]).toFixed(2);


      const handleSubmit = (e) => {
        e.preventDefault();
        setopenreceipt(true);
        setBilldata((prevBilldata) => [...prevBilldata, checkoutform]);
        console.log(billdata)
      };
  return (
    <>
    <div class="flex flex-wrap w-full px-10 my-3">
        <div class="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 min-h-[auto] max-h-[300px] overflow-auto ">
            {cartdata
              .reduce((acc, item) => {
                if (!acc.find((existingItem) => existingItem.id === item.id)) {
                  acc.push(item);
                }
                return acc;
              }, [])
              .map((item) => (
                <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    class="m-2 h-24 w-28 rounded-md border object-center object-contain"
                    src={item.image}
                    alt=""
                  />
                  <div class="flex w-full flex-col px-4 py-4">
                    <span class="font-semibold">{item?.title}</span>
                    <span class="float-right text-gray-400">x {quantity[item.id]}</span>
                    <p class="text-xl font-medium">${item?.price}</p>
                  </div>
                </div>
              ))}
          </div>
          <p className="w-full text-xl font-medium mt-3 rounded-lg border px-2 py-2 sm:px-6">
              Total{" "}
              <span className="text-black float-right">
              ${calculateTotalPrice()}
              </span>
            </p>
          <p class="mt-8 text-lg font-medium">Shipping Methods</p>
          <form class="mt-5  gap-6">
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_1"
                type="radio"
                name="shippingMethod"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={handleShippingChange}
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
               >
                <CiDeliveryTruck
                  class="w-14 object-cover text-5xl"
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Standard Delivery</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_2"
                type="radio"
                name="shippingMethod"
                value="fedex"
                checked={shippingMethod === "fedex"}
                onChange={handleShippingChange}
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <FaFedex
                  class="w-14 object-cover text-5xl"
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Fedex Delivery</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: 1-2 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div class="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Payment Details</p>
          <p class="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <form onSubmit={handleSubmit}>
            <label for="email" class="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div class="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={checkoutform.email}
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com" onChange={handlechange} required
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <FaAt className="h-4 w-4 text-gray-400"/>
              </div>
            </div>
            <label
              for="card-holder"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div class="relative">
              <input
                type="text"
                id="card-holder"
                value={checkoutform.cardholdername}
                name="cardholdername"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here" onChange={handlechange} required
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <FaRegCreditCard className="h-4 w-4 text-gray-400"/>
              </div>
            </div>
            <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">
              Card Details
            </label>
            <div class="flex">
              <div class="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="carddetails.cardnumber"
                  value={checkoutform.carddetails.cardnumber}
                  class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx" onChange={handlechange} required
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                 <FaCreditCard className="h-4 w-4 text-gray-400"/>
                </div>
              </div>
              <input
                type="text"
                name="carddetails.month"
                value={checkoutform.carddetails.month}
                class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY" onChange={handlechange}
              />
              <input
                type="text"
                name="carddetails.CVV"
                value={checkoutform.carddetails.CVV}
                class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC" onChange={handlechange} required
              />
            </div>
            <label
              for="billing-address"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div class="flex flex-col sm:flex-row">
              <div class="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billingaddress.Address"
                  value={checkoutform.billingaddress.Address}
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address" onChange={handlechange} required
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FaGlobe className="h-4 w-4 object-contain text-gray-400"/>
                </div>
              </div>
              <input
                type="text"
                name="billingaddress.city"
                value={checkoutform.billingaddress.city}
                class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={handlechange} placeholder="City" required
              >
                {/* <option value="State" disabled>City</option> 
                <option value={checkoutform.billingaddress.city}>Islamabad</option>
                <option value={checkoutform.billingaddress.city}>Karachi</option>
                <option value={checkoutform.billingaddress.city}>Peshawar</option> */}
              </input> 
              <input
                type="text"
                name="billingaddress.zip"
                value={checkoutform.billingaddress.zip}
                class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={handlechange}
                placeholder="ZIP" required
              />
            </div>
            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900"> <span className="text-black float-right">
                ${calculateTotalPrice()}
              </span></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">${shippingCosts[shippingMethod].toFixed(2)}</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">${shipping}</p>
            </div>
            <button type="submit" class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>
          </form>
        </div>
      </div>
      {openreceipt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center"
        onClick={() => setopenreceipt(false)}>
          <Ordereceipt />
        </div>
      )}
      {open && <Cart/>}
    </>
  );
};

export default Checkout;
