import React from 'react'
import { Link } from 'react-router-dom'



const Home = () => {

  

  return (
    <div className="home-container-div">
      <div className="sale-div">SALE NOW ON</div>
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
