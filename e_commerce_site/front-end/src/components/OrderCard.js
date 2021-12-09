import React from 'react'
import Card from 'react-bootstrap/Card'
// import Button from '@restart/ui/esm/Button'
// import { Link } from 'react-router-dom'
// import addtocart from '../styles/images/icons/shopping-cart-add-black.png'
// import favourite from '../styles/images/icons/heart-black.png'
// import { useParams } from 'react-router-dom'
/*eslint camelcase: ["error", {allow: ["start_date", "ordered_date"]}]*/
const ProductCard = ({ items, ordered_date  }) => {
  console.log(items)
  console.log(items[0].product)

  // const { id } = useParams()

  return (
    <Card className="product-card">
      <Card.Body className="card-body">
        <Card.Title>{items[0].quantity} {items[0].product.brand} {items[0].product.product_model} in orders</Card.Title>
        <Card.Text className="card-text">
          Ordered on {ordered_date}
        </Card.Text>
        <Card.Text className="card-text">
          Total: £{items[0].product.price * items[0].quantity}
        </Card.Text>
        {/* <Button className="button"><Link className="link" to={`/products/${id}/`}><img src={favourite} alt="Save to Favourites" /></Link></Button>
        <Button className="button"><Link className="link" to={'/basket'}><img src={addtocart} alt="Add to Basket" /></Link></Button> */} 
      </Card.Body>
    </Card>
  )
}

export default ProductCard
