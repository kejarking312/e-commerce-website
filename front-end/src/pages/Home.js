import React from 'react'
import { Link } from 'react-router-dom'



const Home = () => {

  

  return (
    <div className="home-container-div">
      <marquee className="sale-div" width="100%" direction="left" height="50px">SALE NOW ON</marquee>
      <div className="home-links-div">
        <div className="mens-div">
          <Link className="mens-link" to='/products/mens'>Shop Mens</Link>
        </div>
        <div className="womens-div">
          <Link className="womens-link" to='/products/womens'>Shop Womens</Link>
        </div>
        <div className="kids-div">
          <Link className="kids-link" to='/products/kids'>Shop Kids</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
