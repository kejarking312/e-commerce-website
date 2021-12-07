import React from 'react'
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

const KidsProductList = () => {

  const [kidsProducts, setKidsProducts] = useState([])

  useEffect(() => {
    async function fetchProducts(){
      const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/categories/3/',
        headers: {},
      }
    
      const response = await axios(config)
      console.log(response.data)
      setKidsProducts(response.data.product_set)
      
    }
    fetchProducts()
  }, [])

  return (
    <div className="products-list-div">
      <ul className="products-list">
        {kidsProducts.map((p) => (
          <li key={p._id}>
            <ProductCard {...p} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KidsProductList

