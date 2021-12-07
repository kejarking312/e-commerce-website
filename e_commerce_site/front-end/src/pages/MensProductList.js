import React from 'react'
import ProductCard from '../components/ProductCard'

const MensProductList = ({ products }) => {

  console.log(products)
  console.log(products.categorys)

  const mensClothes = products

  return (
    <div className="products-list-div">
      <ul className="products-list">
        {mensClothes.map((p) => (
          <li key={p._id}>
            <ProductCard {...p} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MensProductList

