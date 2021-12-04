import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
import { Link } from 'react-router-dom'

const ProductCard = ({ _id, brand, type, image, price }) => {
  console.log(brand)

  return (
    <Card style={{ width: '18rem' }} className="product-card">
      <Card.Body className="card-body">
        <Card.Title>{brand}</Card.Title>
        <Card.Text className="card-text">
          {type}
        </Card.Text>
        <Link to={`/products/${_id}`}>
          <Card.Img 
            className="card-image" 
            src={image} alt={type} 
            style={{ height: '100%', width: '50%' }} />
        </Link> 
        <Card.Text className="card-text">
          £{price}
        </Card.Text>
        <Button className="button">
          <Link className="link" to={`/products/${_id}`} >More Info</Link>
        </Button>
        {/* <Button className="button">
          <Link className="link" >Add to Basket</Link>
        </Button> */}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
