import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
import ProductCard from '../components/ProductCard'


const AllProductList = ({ products }) => {

  console.log('products', products)

  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   async function fetchProducts(){
  //     const config = {
  //       method: 'get',
  //       url: 'http://127.0.0.1:8000/api/products/',
  //       headers: {},
        
  //     }
    
  //     const response = await axios(config)
  //     console.log(response.data)
  //     setProducts(response.data)
  //   }
  //   fetchProducts()
  // }, [])



  return (
    <div className="products-list-div">
      <ul className="products-list">
        {products.map((p) => (
          <li className="product" key={p._id}>
            <ProductCard {...p} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllProductList
