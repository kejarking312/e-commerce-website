import React from 'react'
import axios from 'axios'
// import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { deleteMovie } from '../helpers/api'
import { Button, Modal } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'

import ProductEdit from '../components/ProductEdit'
import Login from '../components/Login'
import Register from '../components/Register'

import login from '../styles/images/icons/user-add.png'
import signup from '../styles/images/icons/document-signed.png'
import addtocart from '../styles/images/icons/shopping-cart-add-black.png'
import favourite from '../styles/images/icons/heart-black.png'


const ProductShow = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([])
  const { id } = useParams()
  const [show, setShow] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleClose = () => setShow(false)
  const handleLogInClose = () => setShowLogIn(false)
  const handleRegisterClose = () => setShowRegister(false)
  const handleShow = () => setShow(true)
  const handleLogInShow = () => setShowLogIn(true)
  const handleRegisterShow = () => setShowRegister(true)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProducts(){
      const config = {
        method: 'get',
        url: `http://127.0.0.1:8000/api/products/${id}`,
        headers: {}, 
      }
    
      const response = await axios(config)
      console.log(response.data)
      setProducts(response.data)
    }
    fetchProducts()
  }, [id])

  const handleDeleteClick = () => {
    deleteMovie(id)
      .then((data) => {
        console.log(data)
        navigate('/products')
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }

  return (
    <div className="product-show-div">
      <div className="carousel-div">
        <Carousel className="carousel" fade>
          <Carousel.Item className="carousel-item">
            <img 
              className="d-block w-100"
              src={products.image_1}
              alt={products.type}
            />
            <Carousel.Caption className="carousel-caption">
              <p>{products.brand} {products.product_model}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={products.image_2}
              alt={products.type}
            />
            <Carousel.Caption>
              <p>{products.brand} {products.product_model}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={products.image_3}
              alt={products.type}
            />
            <Carousel.Caption>
              <p>{products.brand} {products.product_model}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="product-data-container-div">
        <div className="product-info">
          <h1>
            {products.brand} {products.product_model}
          </h1>
          <p>Colour: {products.colour}</p>
          <p>Item: {products.type}</p>
          <p>Size: {products.size}</p>
          <p>{products.label}</p>
          <p>£{products.price}</p>
        </div>
        {isLoggedIn ? (
          <>
            <div id="edit-product-buttons" className="edit-product-buttons">
              <Button className="edit-product-button button" variant="primary" onClick={handleShow}>
                Edit
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Your Item</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProductEdit /></Modal.Body>
                <Modal.Footer>
                  <Button className="button" variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button className="button" variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button className="button" onClick={handleDeleteClick}>Delete</Button>
              <Button className="button"><Link className="link" to={`/products/${id}/`}><img src={favourite} alt="Save to Favourites" /></Link></Button>
              <Button className="button"><Link className="link" to={`/products/${id}/`}><img src={addtocart} alt="Add to Basket" /></Link></Button>
            </div>
          </>
        ) : (
          <>
            <div id="edit-product-buttons" className="edit-product-buttons">
              <p>Log in to edit this item</p>
              <Button className="log-in-button button" variant="primary" onClick={handleLogInShow}>
                <img src={login} alt="Log In" /> Log In
              </Button>
              <Modal show={showLogIn} onHide={handleLogInClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body><Login /></Modal.Body>
                <Modal.Footer>
                  <Button className="button" variant="secondary" onClick={handleLogInClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button className="sign-up-button button" variant="primary" onClick={handleRegisterShow}>
                <img src={signup} alt="Sign Up" /> Sign Up
              </Button>
              <Modal show={showRegister} onHide={handleRegisterClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body><Register /></Modal.Body>
                <Modal.Footer>
                  <Button className="button" variant="secondary" onClick={handleRegisterClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </>
        )}
      </div>
    </div> 
  )
}

export default ProductShow
