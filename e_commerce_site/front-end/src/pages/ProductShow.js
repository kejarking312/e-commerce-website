import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router'

const ProductShow = () => {
  const [products, setProducts] = useState([])
  const { id } = useParams()

  useEffect(() => {
    async function fetchProducts(){
      const config = {
        method: 'get',
        url: `http://127.0.0.1:8000/api/products/${id}`,
        headers: {}, 
      }
    
      const response = await axios(config)
      setProducts(response.data)
    }
    fetchProducts()
  }, [id])

  return (
    <div className="products-list-div">
      <ul className="products-list">
        <ProductCard {...products} />
      </ul>
    </div>
  )
}

export default ProductShow
