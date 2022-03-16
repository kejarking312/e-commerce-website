import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
import Carousel from 'react-bootstrap/Carousel'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../helpers/auth'
import addToCart from '../styles/images/icons/shopping-cart-add-black.png'
import favourite from '../styles/images/icons/heart-black.png'
/*eslint camelcase: ["error", {allow: ["image_1", "image_2", "image_3", "product_model"]}]*/
const ProductCard = ({
  id,
  brand,
  product_model,
  image_1,
  image_2,
  image_3,
  price,
  type,
}) => {
  const [isError, setIsError] = useState(false)

  const handleError = (error) => {
    if (error.response) {
      setIsError(true)
    }
  }

  const handleAddToCart = async (event) => {
    event.preventDefault()
    const data = ''

    const config = {
      method: 'post',
      url: `http://localhost:8000/api/products/add-to-cart/${id}/`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data: data,
    }
    try {
      const response = await axios(config).catch(handleError)

      console.log(response.data)
      setIsError(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card className="product-card">
      <Card.Body className="card-body">
        <Card.Title>
          {brand} {product_model}
        </Card.Title>
        <Link className="product-link" to={`/products/${id}/`}>
          <Carousel className="carousel" fade>
            <Carousel.Item className="carousel-item">
              <img className="d-block w-100" src={image_1} alt={type} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={image_2} alt={type} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={image_3} alt={type} />
            </Carousel.Item>
          </Carousel>
        </Link>
        <Card.Text className="card-text">£{price}</Card.Text>
      </Card.Body>
      <div className="card-buttons">
        <Button className="button">
          <Link className="link" to={`/products/${id}/`}>
            More Info
          </Link>
        </Button>
        <Button className="button">
          <Link className="link" to={`/products/${id}/`}>
            <img src={favourite} alt="Save to Favourites" />
          </Link>
        </Button>
        <Button className="button" onClick={handleAddToCart}>
          <img src={addToCart} alt="Add to Basket" />
        </Button>
        {isError ? (
          <div className="error">
            <p>Error. Please try again.</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Card>
  )
}

export default ProductCard
