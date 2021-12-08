import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../helpers/auth'
// import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'

import AllProductList from './AllProductList'
import MensProductList from './MensProductList'
import WomensProductList from './WomensProductList'
import KidsProductList from './KidsProductList'

import { Button, Modal } from 'react-bootstrap'

const ProductList = () => {
  const [data, setData] = useState(
    {
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

  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false)

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  
  const navigate = useNavigate()

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    async function fetchProducts(){
      const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/products/',
        headers: {},
        
      }
    
      const response = await axios(config)
      console.log(response.data)
      setProducts(response.data)
    }
    fetchProducts()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('data', data)
    console.log(getToken())
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/products/',
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
      navigate(`/products/${response.data.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const formInputProps = { data, errorInfo, handleFormChange }


  const [component, setComponent] = useState('AllProductList')
  const renderInfo = type => {
    switch (type) {
      case 'AllProductList':
        return <AllProductList products={products} />
      case 'MensProductList':
        return <MensProductList />
      case 'WomensProductList':
        return <WomensProductList />
      case 'KidsProductList':
        return <KidsProductList products={products} />
      default:
        return null
    }
  }

  return (
    <div className="products-list-div">
      <div className="category-buttons">
        <Button className="all-products-button button" onClick={() => setComponent('AllProductList')}>
          All Clothes
        </Button>
        <Button className="mens-button button" onClick={() => setComponent('MensProductList')}>
          Mens Clothes
        </Button>
        <Button className="womens-button button" onClick={() => setComponent('WomensProductList')}>
          Womens Clothes
        </Button>
        <Button className="kids-button button" onClick={() => setComponent('KidsProductList')}>
          Kids Clothes
        </Button>
        <Button className="add-product-button button" variant="primary" onClick={handleShow}>
          Add Your Own Item
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button className="button" variant="primary" onClick={handleSubmit}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>      
      
      <div className="product-list-info">
        {renderInfo(component)}
      </div>
    </div>
  )
}

export default ProductList
