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
// import Nav from './components/Nav'
import Footer from './components/Footer'
import Nav2 from './components/Nav2'

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
    // const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
      if (getToken()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [])

    // useEffect(() => {
    //   async function fetchProducts(){
    //     const config = {
    //       method: 'get',
    //       url: 'http://127.0.0.1:8000/api/products/',
    //       headers: {},
          
    //     }
      
    //     const response = await axios(config)
    //     console.log(response.data)
    //     setAllProducts(response.data)
    //   }
    //   fetchProducts()
    // }, [])

    return (
      <>
        <header>
          <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
          <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
          <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <ProductShow isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }

  function AddOneProduct() {
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
          <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <ProductAdd />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    )
  }

  function EditOneProduct() {
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
          <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </header>
        <main>
          <ProductEdit />
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
          <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
          <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
          <Nav2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
        <Route path="/products/addproduct" element={<AddOneProduct />} />
        <Route path="/products/:id/edit" element={<EditOneProduct />} />
        <Route path="/products/:id" element={<ShowOneProduct />} />
        {/* <Route path="/products/mens" element={<Products />}/> */}
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
