import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
// import ProductCard from '../components/ProductCard'
import ProductAdd from '../components/ProductAdd'

import AllProductList from './AllProductList'
import MensProductList from './MensProductList'
import WomensProductList from './WomensProductList'
import KidsProductList from './KidsProductList'

import { Button, Modal } from 'react-bootstrap'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false)

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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Item</Modal.Title>
        </Modal.Header>
        <Modal.Body><ProductAdd /></Modal.Body>
        <Modal.Footer>
          <Button className="button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="button" variant="primary" onClick={handleClose}>
            Save Changes
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
