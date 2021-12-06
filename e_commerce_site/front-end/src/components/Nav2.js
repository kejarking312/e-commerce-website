import * as React from 'react'
// import { Link } from 'react-router-dom'
import { removeToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'
import { Navbar, Container, NavDropdown, Nav, Form, FormControl, Offcanvas, Button  } from 'react-bootstrap'

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
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Clothing" id="basic-nav-dropdown">
              <NavDropdown.Item href="/products">All Clothes</NavDropdown.Item>
              <NavDropdown.Item href="/products">Mens</NavDropdown.Item>
              <NavDropdown.Item href="/products">Womens</NavDropdown.Item>
              <NavDropdown.Item href="/products">Kids</NavDropdown.Item>
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
            <Button variant="outline-success">Search</Button>
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
                    <Navbar.Text onClick={handleLogout}>Logout</Navbar.Text>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Sign Up</Nav.Link>
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
