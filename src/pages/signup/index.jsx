import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate()
    const [input, setInput]=useState({
        name:'',
        email:'',
        password:'',
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        localStorage.setItem("user" , JSON.stringify(input))
        navigate("/login")
    }
    const handlechange=(e)=>{
        setInput({...input, [e.target.name] : e.target.value})
    }
  return (

    <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-2xl">
            <h1 className="text-2xl font-semibold text-center text-black mt-8 mb-6">Register</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label for="firstName" className="block mb-2 text-sm text-black-600">Name</label>
                <input type="text" id="Name" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" value={input.name} onChange={handlechange}required/>
            </div>
            <div className="mb-4">
                <label for="email" className="block mb-2 text-sm text-black-600">Email</label>
                <input type="email" id="email" name="email" value={input.email} onChange={handlechange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required/>
            </div>
            <div className="mb-4">
                <label for="password" className="block mb-2 text-sm text-black-600">Password</label>
                <input type="password" id="password" name="password" value={input.password} onChange={handlechange    
                } className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required/>
            </div>
            <button type="submit" className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">Register</button>
            </form>
            <div className="text-center">
            <p className="text-sm">Already have an account? <Link to="/login" className="text-cyan-600">Log in</Link></p>
            </div>
        </div>
    </div>

  );
};

export default Signup;
