import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate()

  const [input, setInput]=useState({
    email:'',
    password:'',
})

const handlechange=(e)=>{
  setInput({...input, [e.target.name] : e.target.value})
}

const handleLogin = (e)=>{
  e.preventDefault()
  const loggeduser = JSON.parse(localStorage.getItem("user"));
  console.log(loggeduser)
  if (input.email===loggeduser.email &&
      input.password===loggeduser.password
  ){
    localStorage.setItem('loggedin', true); //for record of logged user 
    navigate("/home")
  }else{
    alert('Wrong email or password')
  }
}

  return (

    <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-2xl">
            <h1 className="text-2xl font-semibold text-center text-black mt-8 mb-6">Login</h1>
            <form onSubmit={handleLogin}>
            <div className="mb-4">
                <label for="email" className="block mb-2 text-sm text-black-600">Email</label>
                <input type="email" id="email" name="email" value={input.email} onChange={handlechange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required/>
            </div>
            <div className="mb-4">
                <label for="password" className="block mb-2 text-sm text-black-600">Password</label>
                <input type="password" id="password" name="password" value={input.password} onChange={handlechange    
                } className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required/>
            </div>
            <button type="submit" className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">Login</button>
            </form>
            <div className="text-center">
              <p className="text-sm">Do not have an account? <Link to ="/" className="text-cyan-600">Sign Up</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login
