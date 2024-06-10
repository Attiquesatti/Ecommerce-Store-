import React from 'react'
import Hero from './components/hero'
import withAuth from '../../Services/ProtectedRoutes'

const Home = () => {
  return (
    <>
     <Hero/>
    </>
  )
}

export default withAuth(Home)
