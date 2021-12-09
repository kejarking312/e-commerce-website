import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import OrderCard from '../components/OrderCard'

const Orders = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders(){
      const data = ''
      const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/products/orders/',
        headers: {
          'Cookie': 'messages=.eJyLjlaKj88qzs-Lz00tLk5MT1XSMdAxMtBR8ixJzVVITElJTVEoyVeozC8tUkhOLCpRitXBpcMRrLiwNDGvJLOkUgFkwNBVHQsAv4Rd_g:1muwoG:KuF1BSCH9XeWZw-qa_G5n058hr7AvJmoCa-v5YCsO-k',
        },
        data: data,
      }
    
      const response = await axios(config)
      console.log(response.data)
      setOrders(response.data)
    }
    fetchOrders()
  }, [])



  return (
    <div className="orders-list-div">
      <ul className="orders-list">
        {orders.map((o) => (
          <li className="product" key={o._id}>
            <OrderCard {...o}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders
