import React from "react";
import Navbar from "../components/header/header";
// import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import { useLocation } from "react-router-dom";

const MainLayout = ({children}) => {
  const {pathname}=useLocation()
  return (
    <div className="h-screen">
      {<Navbar/>}
      <div className="flex w-full">
      {!pathname.includes("checkout") && !pathname.includes("product") && !pathname.includes("receipt") && <Sidebar />}
      <div className="grow h-[calc(100vh-60px)] overflow-auto">
      {children}
      {/* {<Footer/>} */}
      </div>
      </div>
      
    </div>
  );
};

export default MainLayout;
