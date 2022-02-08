import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import { getToken } from '../helpers/auth'
import { useNavigate } from 'react-router'
import { useState } from 'react'

/*eslint camelcase: ["error", {allow: ["start_date", "ordered_date"]}]*/
const OrderCard = ({ items, ordered_date, product, orders, setOrders }) => {
  console.log(items)
  console.log(items[0])
  console.log(product)

  const navigate = useNavigate()
  // const { id } = useParams()

  // const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)

  const handleError = (error) => {
    if (error.response) {
      // setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleRemoveFromCart = async (event) => {
    event.preventDefault()
    const data = ''
    const config = {
      method: 'delete',
      url: `http://localhost:8000/api/products/remove-from-cart/${items[0].product.id}/`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data: data,
    }
    try {
      const response = await axios(config).catch(handleError)
      console.log(response.data)
      setIsError(false)
      setOrders(orders)
      navigate('/products/orders')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card className="product-card">
      <Card.Body className="card-body">
        <Card.Title>
          {items[0].quantity} {items[0].product.brand}{' '}
          {items[0].product.product_model} in orders
        </Card.Title>
        <Card.Text className="card-text">Ordered on {ordered_date}</Card.Text>
        <Card.Text className="card-text">
          Total: £{items[0].product.price * items[0].quantity}
        </Card.Text>
        <Button className="button" onClick={handleRemoveFromCart}>
          Remove
        </Button>
        {isError ? (
          <div className="error">
            <p>Error. Please try again.</p>
          </div>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  )
}

export default OrderCard
