import React from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getToken } from './helpers/auth'

import Home from './pages/Home'
import ProductShow from './pages/ProductShow'
import ProductList from './pages/ProductList'
import ProductEdit from './components/ProductEdit'
import NotFound from './pages/NotFound'
import ProductAdd from './components/ProductAdd'
import Login from './components/Login'
import Register from './components/Register'
import Footer from './components/Footer'
import Nav2 from './components/Nav2'
import MensProductList from './pages/MensProductList'
import WomensProductList from './pages/WomensProductList'
import KidsProductList from './pages/KidsProductList'
import BasketShow from './components/BasketShow'
import Orders from './pages/Orders'

function App(props) {
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/products') 
      console.log(res.data)
    }
    getData()
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const [products, setProducts] = useState([])
  useEffect(() => {
    async function fetchProducts(){
      const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/products/',
        headers: {},
        
      }
    
      const response = await axios(config)
      console.log(response.data)
      setProducts(response.data)
    }
    fetchProducts()
  }, [])
  
  return (
    <>
      <header>
        <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Routes>
          <Route path="/products/addproduct" element={<ProductAdd />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/products/:id" element={<ProductShow isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/products/mens" element={<MensProductList />}/>
          <Route path="/products/womens" element={<WomensProductList />}/>
          <Route path="/products/kids" element={<KidsProductList />}/>
          <Route path="/products/" element={<ProductList products={products} />} />
          <Route path="/products/orders" element={<Orders isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/basket" element={<BasketShow />} />
          <Route path="/login" element={<Login {...props} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
          <Route index element={<Home />} />
          <Route element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
