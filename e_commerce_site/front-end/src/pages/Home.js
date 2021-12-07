import React from 'react'
import { Link } from 'react-router-dom'



const Home = () => {

  

  return (
    <div>
      <h1>Welcome to the shop</h1>
      <Link to='/products/mens'>Mens</Link>
      <br></br>
      <Link to='/products/womens'>Womens</Link>
      <br></br>
      <Link to='/products/kids'>Kids</Link>
    </div>
  )
}

export default Home
