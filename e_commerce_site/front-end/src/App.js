import React from 'react'
import axios from 'axios'
import ProductList from './components/ProductList'
import NotFound from './components/NotFound'
import { Routes, Route } from 'react-router-dom'

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
          <h1>Welcome to the Shop</h1>
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

  return (
    <>
      <Routes>
        <Route path="/movies" element={<Products />}/>
        <Route index element={<HomePage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
