import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({data}) => {
  const navigate=useNavigate()
  const isAuth = localStorage.getItem("loggedin");
  const nonAuth=()=>{
   navigate('/login')
   
  }

  return isAuth ? (
    <data.layout>
      <data.component  />
    </data.layout> 

) : (nonAuth())
};

export default ProtectedRoute;
