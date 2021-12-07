import React from 'react'
import axios from 'axios'
// import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { deleteMovie } from '../helpers/api'
import Button from 'react-bootstrap/Button'

const ProductShow = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([])
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProducts(){
      const config = {
        method: 'get',
        url: `http://127.0.0.1:8000/api/products/${id}`,
        headers: {}, 
      }
    
      const response = await axios(config)
      console.log(response.data)
      setProducts(response.data)
    }
    fetchProducts()
  }, [id])

  const handleDeleteClick = () => {
    deleteMovie(id)
      .then((data) => {
        console.log(data)
        navigate('/products')
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }

  return (
    <div className="product-show-div">
      <div className="product-img-div">
        <img className="product-img"
          url={products.image}
        />
      </div>
      <div className="product-data-container-div">
        <div className="product-info">
          <h1>
            {products.brand} {products.description}
          </h1>
          {/* <h2>{products.categorys}</h2> */}
          <p>{products.type}</p>
          <p>{products.size}</p>
          <p>£{products.price}</p>
        </div>
      
        {isLoggedIn ? (
          <>
            <div id="edit-product-buttons" className="edit-product-buttons">
              <Button className="button"><Link className="link" to={`/products/${id}/edit`}>Edit</Link></Button>
              <Button className="button" onClick={handleDeleteClick}>Delete</Button>
              <Button className="button"><Link className="link" to={`/products/${id}/`}>Favourite</Link></Button>
              <Button className="button"><Link className="link" to={`/products/${id}/`}>Add to Basket</Link></Button>
            </div>
          </>
        ) : (
          <>
            <div id="edit-product-buttons" className="edit-product-buttons">
              <p>Log in to edit this item</p>
              <Button id="button"  className="button"><Link className="link" to={'/login'}>Log In</Link></Button>
              <Button id="button" className="button"><Link className="link" to={'/register'}>Sign Up</Link></Button>
            </div>
          </>
        )}
      </div>
    </div> 
  )
}

{/* <div className="products-list-div">
        <ul className="products-list">
          <ProductCard {...products} />
        </ul>
      </div> */}
export default ProductShow
