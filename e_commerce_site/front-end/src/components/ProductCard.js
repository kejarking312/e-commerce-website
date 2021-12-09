import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'
import addtocart from '../styles/images/icons/shopping-cart-add-black.png'
import favourite from '../styles/images/icons/heart-black.png'
// import { useParams } from 'react-router-dom'
/*eslint camelcase: ["error", {allow: ["image_1", "image_2", "image_3", "product_model"]}]*/
const ProductCard = ({ id, brand, product_model, image_1, image_2, image_3, price, colour, type }) => {
  console.log(brand)

  // const { id } = useParams()

  return (
    <Card className="product-card">
      <Card.Body className="card-body">
        <Card.Title>{brand} {product_model}</Card.Title>
        <Card.Text className="card-text">
          {colour}
        </Card.Text>
        <Link className="product-link" to={`/products/${id}/`}>
          <Carousel className="carousel" fade>
            <Carousel.Item className="carousel-item">
              <img 
                className="d-block w-100"
                src={image_1}
                alt={type}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image_2}
                alt={type}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image_3}
                alt={type}
              />
            </Carousel.Item>
          </Carousel>
        </Link> 
        <Card.Text className="card-text">
          £{price}
        </Card.Text>
      </Card.Body>
      <div className="card-buttons">
        <Button className="button">
          <Link className="link" to={`/products/${id}/`} >More Info</Link>
        </Button>
        <Button className="button"><Link className="link" to={`/products/${id}/`}><img src={favourite} alt="Save to Favourites" /></Link></Button>
        <Button className="button"><Link className="link" to={'/basket'}><img src={addtocart} alt="Add to Basket" /></Link></Button>
      </div>
      
    </Card>
  )
}

export default ProductCard
