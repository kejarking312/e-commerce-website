import React from 'react'
import { Link } from 'react-router-dom'



const Home = () => {

  

  return (
    <div>
      <h1>Welcome to the shop</h1>
      <Link to='/products/mens'>Mens</Link>
    </div>
  )
}

export default Home
