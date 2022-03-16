import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import { getToken } from '../helpers/auth'
import { useNavigate } from 'react-router'
import { useState } from 'react'

/*eslint camelcase: ["error", {allow: ["start_date", "ordered_date"]}]*/
const OrderCard = ({ items, ordered_date, orders, setOrders }) => {
  console.log(items)
  console.log(ordered_date)

  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)

  const handleError = (error) => {
    if (error.response) {

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
    <div className="products-list-div">
      {items.length === 0 ? (
        <div className="empty-order">
          <p>No Current Order</p>
        </div>
      ) : 
        <ul className="products-list">
          {items.map((o) => (
            <li className="product" key={o._id}>
              <Card className="product-card">
                <Card.Body className="card-body">
                  <Card.Title>
                    {o.quantity} {o.product.brand}{' '}
                    {o.product.product_model} in orders
                  </Card.Title>
                  <Card.Text className="card-text">Ordered on {ordered_date}</Card.Text>
                  <Card.Text className="card-text">
                  Total: £{o.product.price * o.quantity}
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
            </li>
          ))}
          
        </ul>  
      }
      
      {isError ? (
        <div className="error">
          <p>Error. Please try again.</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
  
}


export default OrderCard
