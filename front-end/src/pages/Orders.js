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
  console.log(orders.length)
  console.log(orders)
  // console.log(orders[0].user)

  for (let i = 0; i < orders.length; i++){
    console.log(orders[i].user)
  }
  
  return (
    <div className="orders-list-div">
      <ul className="orders-list">
        {/*    
        <li className="order" >
          <OrderCard {...orders} />   
        </li> */}
    
        {orders.map((o) => (
          <li className="order" key={o._id}>
            <OrderCard {...o} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders
