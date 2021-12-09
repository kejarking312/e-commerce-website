import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import OrderCard from '../components/OrderCard'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      const data = ''
      const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/products/orders/',
        headers: {},
        data: data,
      }

      const response = await axios(config)
      console.log(response.data)
      console.log(response.data.items)
      setOrders(response.data)
    }
    fetchOrders()
  }, [])

  return (
    <div className="products-list-div">
      <ul className="products-list">
        {orders.map((o) => (
          <li className="product" key={o._id}>
            <OrderCard {...o} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders
