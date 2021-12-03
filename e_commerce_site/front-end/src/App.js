import React from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

import ProductList from './components/ProductList'
import ProductShow from './components/ProductShow'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'

function App() {
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/products') 
      console.log(res.data)
    }
    getData()
  })

  function HomePage() {
  
    return (
      <>
        <header>
        </header>
        <main>
          <Home />
        </main>
        <footer>
          
        </footer>
      </>
    )
  }

  function Products() {
  
    return (
      <>
        <header>
        </header>
        <main>
          <ProductList />
        </main>
        <footer>
        </footer>
      </>
    )
  }

  function ShowOneProduct() {
    
    return (
      <>
        <header>
        </header>
        <main>
          <ProductShow />
        </main>
        <footer>
          
        </footer>
      </>
    )
  }

  function NotFoundPage() {
  
    return (
      <>
        <header>
          
        </header>
        <main>
          <NotFound />
        </main>
        <footer>
          
        </footer>
      </>
    )
  }

  function UserLogIn() {
    
    return (
      <>
        <header>
          
        </header>
        <main>
          <Login />
        </main>
        <footer>
          
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
        <Route index element={<HomePage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
