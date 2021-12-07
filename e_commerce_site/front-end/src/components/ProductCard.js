import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
import { Link } from 'react-router-dom'
import addtocart from '../styles/images/icons/shopping-cart-add-black.png'
import favourite from '../styles/images/icons/heart-black.png'
// import { useParams } from 'react-router-dom'
/*eslint camelcase: ["error", {allow: ["image_1", "image_2", "image_3"]}]*/
const ProductCard = ({ id, brand, type, image_1, price }) => {
  console.log(brand)

  // const { id } = useParams()

  return (
    <Card style={{ width: '18rem' }} className="product-card">
      <Card.Body className="card-body">
        <Card.Title>{brand}</Card.Title>
        <Card.Text className="card-text">
          {type}
        </Card.Text>
        <Link className="product-link" to={`/products/${id}/`}>
          <Card.Img 
            className="card-image" 
            src={image_1} alt={type} 
            style={{ height: '50%', width: '60%' }} />
        </Link> 
        <Card.Text className="card-text">
          £{price}
        </Card.Text>
        <Button className="button">
          <Link className="link" to={`/products/${id}/`} >More Info</Link>
        </Button>
        <Button className="button"><Link className="link" to={`/products/${id}/`}><img src={favourite} alt="Save to Favourites" /></Link></Button>
        <Button className="button"><Link className="link" to={`/products/${id}/`}><img src={addtocart} alt="Add to Basket" /></Link></Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
