import React, { useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalState'
import { FaMinus, FaPlus } from 'react-icons/fa'

const Quantity = ({id, type}) => {

    const{quantity, increaseQuantity, decreaseQuantity}=useContext(GlobalContext)
    
  const quantity1 = quantity[id] || 0;
  return (
    <div className="flex">
        <button className="px-4" onClick={() => decreaseQuantity(id)}>
          <FaMinus size={type==='product' ? 18 : 12}/>
        </button>
        <button className="w-10 border-2 rounded-md ">
          {quantity1}
        </button>
        <button className="ps-4" onClick={() => increaseQuantity(id)}>
          <FaPlus size={type==='product' ? 18 : 12} />
        </button>
      </div>
  )
}

export default Quantity
