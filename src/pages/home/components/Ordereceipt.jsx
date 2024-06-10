import React, { useContext } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { GlobalContext } from '../../../context/GlobalState';

const Ordereceipt = () => {

  const { cartdata , quantity, calculateTotalPrice, billdata} = useContext(GlobalContext);

  
  return (
    <div class="flex h-screen w-full items-center justify-center">
    <div class="w-80 rounded bg-gray-50 px-6 pt-8 shadow-2xl">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="chippz" class="mx-auto w-16 py-4" />
      <div class="flex flex-col justify-center items-center gap-2">
          <h4 class="font-semibold">Wear & Gear</h4>
          <p class="text-xs">Building 119, St-3 I9/3 Industrial Area, Pakistan</p>
      </div>
      <div class="flex flex-col gap-3 border-b py-6 text-xs">
        <p class="flex justify-between">
          <span class="text-gray-400">Receipt No:</span>
          <span>#5033</span>
        </p>
        <p class="flex justify-between">
          <span class="text-gray-400">Category:</span>
          <span>Men's wear</span>
        </p>
        <p class="flex justify-between">
          <span class="text-gray-400">Customer Name</span>
          <span>{billdata[0].email}</span>
        </p>
        <p class="flex justify-between">
          <span class="text-gray-400">Phone No.</span>
          <span>John Doe</span>
        </p>
      </div>
      <div class="flex flex-col gap-3 pb-6 pt-2 text-xs">
        <table class="w-full text-left">
          <thead>
            <tr class="flex">
              <th class="w-full py-2">Product Details</th>
              <th class="min-w-[44px] py-2">QTY</th>
              <th class="min-w-[44px] py-2">Total</th>
            </tr>
          </thead>
          <tbody>
              {cartdata.map((item)=>(<>
                <tr class="flex">
                <td class="flex-1 py-1">{item.title}</td>
                <td class="min-w-[44px]">{quantity[item.id]}</td>
                <td class="min-w-[44px]">${item.price}</td>
                </tr>
              </>
              )
            )}
            
          </tbody>
        </table>
        <div class=" border-b border border-dashed"></div>
        <div className='flex justify-between'>
           <p>Shipping Fee</p>
          <p>${calculateTotalPrice()}</p>
          <p>Total</p>
          <p>${calculateTotalPrice()}</p>
        </div>
        <div class="py-4 justify-center items-center flex flex-col gap-2">
          <p class="flex gap-1 text-md"> <MdOutlineMarkEmailUnread className='text-lg'/> info@example.com</p>
          <p class="flex gap-1 text-md"> <FaPhoneAlt className='text-md'/> +234XXXXXXXX</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Ordereceipt
