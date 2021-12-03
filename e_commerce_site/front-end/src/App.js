import React from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getToken } from './helpers/auth'

import ProductList from './components/ProductList'
import ProductShow from './components/ProductShow'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Footer from './components/Footer'
import Nav from './components/Nav'

function App() {
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/products') 
      console.log(res.data)
    }
    getData()
  })

  function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      if (getToken()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [])

    return (
      <>
        <header>
          <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <Home />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }

  function Products() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      if (getToken()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [])

    return (
      <>
        <header>
          <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <ProductList />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }

  function ShowOneProduct() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      if (getToken()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [])

    return (
      <>
        <header>
          <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <ProductShow />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }

  function NotFoundPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      if (getToken()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [])

    return (
      <>
        <header>
          <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <NotFound />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }

  function UserLogIn(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      if (getToken()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [])

    return (
      <>
        <header>
          <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <Login {...props} setIsLoggedIn={setIsLoggedIn}/>
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }

  function UserRegister() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  
    useEffect(() => {
      if (getToken()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [])
  
    return (
      <>
        <header>
          <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <Register />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/products/:id" element={<ShowOneProduct />} />
        <Route path="/products/" element={<Products />}/>
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/register" element={<UserRegister />} />
        <Route index element={<HomePage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
