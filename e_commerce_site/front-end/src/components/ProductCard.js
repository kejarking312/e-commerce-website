import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ _id, brand, type, image, price }) => {
  console.log(brand)

  return (
    <div className="product-card">
      <h2>{brand}</h2>
      <p>{type}</p>
      <picture>
        <Link to={`/products/${_id}`}>
          <img src={image} alt={type} />
        </Link> 
      </picture>
      <p>£{price}</p>  
    </div>
  )
}

export default ProductCard
