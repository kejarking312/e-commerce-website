import React from 'react'

const ProductCard = ({ brand, type, image, price }) => {
  return (
    <div>
      <h2>{brand}</h2>
      <p>{type}</p>
      <picture>
        <img> src={image} alt={name}</img>
      </picture>
      <p>£{price}</p>
    </div>
  )
}

export default ProductCard
