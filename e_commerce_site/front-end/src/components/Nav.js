import * as React from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../helpers/auth'

const Nav = ( ) => {
  
  const isUserLoggedIn = () => {

    return getToken()
  }
  
  return (
    <div className='main-header-div'>
      <div className='logo-div'>
        <h1>E-Commerce App</h1>
      </div>
      <div className='nav-div'>
        <nav>
          <ul>
            <li>
              <Link className='nav-link' to="/">Home</Link>
            </li>
            <li>
              <Link className='nav-link' to="/products">Products</Link>
            </li>
  
            <li>
              <Link className='nav-link' to="/login">Log In</Link>
            </li>
              
          </ul>
        </nav>
      </div>    
    </div>
  )
}

export default Nav
