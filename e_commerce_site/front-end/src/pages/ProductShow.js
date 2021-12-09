import React from 'react'
import axios from 'axios'
// import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { deleteMovie } from '../helpers/api'
import { Button, Modal } from 'react-bootstrap'
import { setToken } from '../helpers/auth'
import { getToken } from '../helpers/auth'
// import { fetchOneProduct } from '../helpers/api'
import Carousel from 'react-bootstrap/Carousel'
import FormInput from '../components/FormInput'
import Form from 'react-bootstrap/Form'

import ProductForm from '../components/ProductForm'
// import Register from '../components/Register'

import login from '../styles/images/icons/user-add.png'
import signup from '../styles/images/icons/document-signed.png'
import addtocart from '../styles/images/icons/shopping-cart-add-black.png'
import favourite from '../styles/images/icons/heart-black.png'


const ProductShow = ({ isLoggedIn, setIsLoggedIn }) => {
  const [products, setProducts] = useState([])
  const { id } = useParams()
  const [show, setShow] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const [data, setData] = useState({
    brand: '',
    product_model: '',
    type: '',
    colour: '',
    size: '',
    price: '',
    discount_price: '',
    label: '',
    categorys: '',
    description: '',
    image_1: '',
    image_2: '',
    image_3: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)

  const handleClose = () => setShow(false)
  const handleLogInClose = () => setShowLogIn(false)
  const handleRegisterClose = () => setShowRegister(false)
  const handleShow = () => setShow(true)
  const handleLogInShow = () => setShowLogIn(true)
  const handleRegisterShow = () => setShowRegister(true)

  const navigate = useNavigate()

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  useEffect(() => {
    async function fetchProduct(){
      const config = {
        method: 'get',
        url: `http://127.0.0.1:8000/api/products/${id}`,
        headers: {}, 
      }
    
      const response = await axios(config)
      console.log(response.data)
      setProducts(response.data)
      setData(response.data)
    }
    fetchProduct()
  }, [id])

  // useEffect(() => {
  //   fetchOneProduct(id).then(setData)
  // }, [id])


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

  const handleEditSubmit = async (event) => {
    event.preventDefault()

    const config = {
      method: 'put',
      url: `http://localhost:8000/api/products/${id}/`,
      headers: { 
        Authorization: `Bearer ${getToken()}`, 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    try {
      const response = await axios(config).catch(handleError)

      console.log(response.data)
      setIsError(false)
      navigate(`/products/${response.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
        
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/auth/login/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config).catch(handleError)
      console.log(response.data.token)
      setToken(response.data.token)
      setIsLoggedIn(true)
      setIsError(false)
      navigate('/')
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/auth/register/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config).catch(handleError)
      setToken(response.data.token)
      setIsError(false)
      navigate('/login')
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }


  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const formInputProps = { data: data, errorInfo, handleFormChange }

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
         
              <Button className="button"><Link className="link" to={`/products/${id}/`}><img src={favourite} alt="Save to Favourites" /></Link></Button>
              <Button className="button"><Link className="link" to={'/basket'}><img src={addtocart} alt="Add to Basket" /></Link></Button>
              <Button className="edit-product-button button" variant="primary" onClick={handleShow}>
                Edit
              </Button>
              <Button className="button" onClick={handleDeleteClick}>Delete</Button>
            
              <Modal show={show} onHide={handleClose} onSubmit={handleEditSubmit} className="form-section">
                <Modal.Header closeButton>
                  <Modal.Title>Edit Your Item</Modal.Title>
                </Modal.Header>
              
                <Modal.Body className="form">
                  
                  <ProductForm formInputProps={formInputProps} />
                  {isError ? (
                    <div className="error">
                      <p>Error. Please try again</p>
                    </div>
                  ) : (
                    <></>
                  )}
                   
                </Modal.Body> 
                
                <Modal.Footer>
                  <Button className="button" variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button className="button" variant="primary" onClick={handleEditSubmit}>
                    Edit
                  </Button>
                </Modal.Footer>
              </Modal>
              
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
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <FormInput 
                        placeholder="email@email.com" 
                        type='text'
                        name='email' 
                        {...formInputProps}  />
                      <FormInput 
                        placeholder='password' 
                        type='password'
                        name='password' 
                        {...formInputProps} />
                      <Form.Control type='submit' value='login' />
                      {isError ? (
                        <div className='error'>
                          <p>Error. Please try again.</p>
                        </div> 
                      ) : (
                        <></>
                      )}
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="button" variant="secondary" onClick={handleLogInClose}>
                    Close
                  </Button>
                  <Button className="button" variant="primary" onClick={handleSubmit}>
                    Log In
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
                <Modal.Body>
                  <Form onSubmit={handleSubmit} className="form">
                    <h1>Register to Shop</h1>
                    <FormInput 
                      placeholder="username" 
                      type='text' 
                      name='username' 
                      {...formInputProps} />
                    <FormInput 
                      placeholder="email@email.com" 
                      type='text' 
                      name='email' 
                      {...formInputProps} />
                    <FormInput 
                      placeholder="password" 
                      type='password' 
                      name='password' 
                      {...formInputProps} />
                    <FormInput 
                      placeholder="confirm password" 
                      type='password' 
                      name='password_confirmation' 
                      {...formInputProps} />
                    <FormInput 
                      placeholder="first name" 
                      type='text' 
                      name='first_name' 
                      {...formInputProps} />
                    <FormInput 
                      placeholder="surname" 
                      type='text' 
                      name='last_name' 
                      {...formInputProps} />
                    <FormInput 
                      placeholder="phone" 
                      type='text' 
                      name='phone' 
                      {...formInputProps} />
                    <FormInput 
                      placeholder="address" 
                      type='text' 
                      name='address' 
                      {...formInputProps} />
                    <Form.Control type='submit' value='register' />
                    {isError ? (
                      <div className='error'>
                        <p>Error. Please try again.</p>
                      </div> 
                    ) : (
                      <></>
                    )}
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="button" variant="secondary" onClick={handleRegisterClose}>
                    Close
                  </Button>
                  <Button className="button" variant="primary" onClick={handleRegister}>
                    Sign Up
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
