import * as React from 'react'
import { Link } from 'react-router-dom'
import { removeToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    removeToken()
    setIsLoggedIn(false)
    navigate('/')
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
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/products/addproduct" className='nav-link' >Add Product</Link>
                </li>
                <li>
                  <span className='nav-link' onClick={handleLogout}>Logout</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className='nav-link' to="/login">Log In</Link>
                </li>
                <li>
                  <Link className='nav-link' to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>    
    </div>
  )
}

export default Nav
