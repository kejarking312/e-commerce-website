import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts(){
      const config = {
        method: 'get',
        url: 'http://localhost:8000/api/products/',
        headers: {},
        
      }
    
      const response = await axios(config)
      console.log(response.data)
      setProducts(response.data)
    }
    fetchProducts()
  }, [])

  return (
    <div className="products-list-div">
      <ul className="products-list">
        {products.map((p) => (
          <li key={p._id}>
            <ProductCard {...p} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
