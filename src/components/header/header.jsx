import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { GiShirt } from "react-icons/gi";


const Navbar = () => {
  const navigate = useNavigate();
  const { open, setOpen , count} = useContext(GlobalContext);

  const username=JSON.parse(localStorage.getItem("user"));

  const handleLogout = ()=>{
    localStorage.removeItem("loggedin")
    navigate('/login')
  }
  return (
  
      <nav class="bg-gray-800 p-4 h-[60px]">
        <div class="container ml-auto flex justify-between items-center ">
          <div class="text-white text-xl font-header-family flex ">
            
            <Link to="/home" className="flex">
             <GiShirt className=" text-3xl pe-1"/>
                Wear & Gear
            </Link>
          </div>
          <div className="relative">
            {/* <input
              className="border-2 border-gray-300 bg-white px-2 rounded-lg text-sm focus:outline-none"
              placeholder="Search Products Here"
            /> */}
            {/* <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
            <p className="text-white font-header-family font-semibold"> Welcome {username?.name}</p>
          </div>
          <ul class="flex space-x-3 font-header-family text-sm">
            <li>
              <Link to="/home" class="text-white hover:text-emerald-200 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="about" class="text-white hover:text-emerald-200 transition duration-300">
                Contact Us
              </Link>
            </li>
            <li className="flex justify-center">
              <Link className="flex relative hover:text-emerald-200 transition duration-300 me-1 items-center">
                <IoCartOutline
                  className="cursor-pointer text-white text-2xl hover:text-emerald-200"
                  onClick={() => setOpen(!open)}
                />
                <div className="absolute top-[-6px] left-6 flex items-center">
                  <span className=" text-black bg-white rounded-md text-center w-4 text-xs">
                    {count}
                  </span>
                </div>
              </Link>
            </li>
            <li className="flex group-hover:text-emerald-200">
              <button className="flex items-center transition duration-300" onClick={handleLogout}>
                <FaRegCircleUser
                  className="cursor-pointer text-white text-lg ms-2 hover:text-emerald-200"
                />
                <span className="text-white hover:text-emerald-200">Logout</span>
              </button>
            </li>
          </ul>
          </div>
      </nav>
  )
};

export default Navbar;
