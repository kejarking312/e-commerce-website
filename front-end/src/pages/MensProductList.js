import React from 'react'
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

const MensProductList = () => {

  // console.log(products)
  // console.log(products.categorys)

  const [mensProducts, setMensProducts] = useState([])

  useEffect(() => {
    async function fetchProducts(){
      const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/categories/1/',
        headers: {},
      }
    
      const response = await axios(config)
      console.log(response.data)
      setMensProducts(response.data.product_set)
      
    }
    fetchProducts()
  }, [])

  return (
    <div className="products-list-div">
      <ul className="products-list">
        {mensProducts.map((p) => (
          <li className="product" key={p._id}>
            <ProductCard {...p} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MensProductList

