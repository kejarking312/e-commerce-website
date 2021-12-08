import * as React from 'react'
// import { Link } from 'react-router-dom'
import { removeToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'
import { Navbar, Container, NavDropdown, Nav, Form, FormControl, Offcanvas, Button  } from 'react-bootstrap'
import home from '../styles/images/icons/home-white-24px.png'
import login from '../styles/images/icons/user-add.png'
import logout from '../styles/images/icons/user-delete.png'
import signup from '../styles/images/icons/document-signed.png'
import search from '../styles/images/icons/search-white.png'
import orders from '../styles/images/icons/list.png'
import account from '../styles/images/icons/user.png'

const Nav2 = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    removeToken()
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
          <Nav className="me-auto" >
            <Nav.Link href="/"><img src={home} alt="Home" /></Nav.Link>
            <NavDropdown title="Clothing" id="basic-nav-dropdown" >
              <NavDropdown.Item href="/products">All Clothes</NavDropdown.Item>
              <NavDropdown.Item href="/products/mens">Mens</NavDropdown.Item>
              <NavDropdown.Item href="/products/womens">Womens</NavDropdown.Item>
              <NavDropdown.Item href="/products/kids">Kids</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/products">
                SALE
              </NavDropdown.Item>
              {isLoggedIn ? (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/products/addproduct">
                  Add your own item
                  </NavDropdown.Item>
                </>
              ) : (
                <></>
              )}            
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success"><img src={search} alt="Search" /></Button>
          </Form>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Your Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {isLoggedIn ? (
                  <>
                    <Navbar.Text href="/orders"><img src={orders} alt="Orders" /> My Orders</Navbar.Text>
                    <Navbar.Text href="/profile"><img src={account} alt="Account" /> Account Details</Navbar.Text>
                    <Navbar.Text onClick={handleLogout}><img src={logout} alt="Log Out" /> Log Out</Navbar.Text>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login"><img src={login} alt="Log In" /> Log In</Nav.Link>
                    <Nav.Link href="/register"><img src={signup} alt="Sign Up" /> Sign Up</Nav.Link>
                  </>
                )}
              </Nav> 
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}

export default Nav2
