import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAxiosRequestConfig } from '../helpers/api'

import ProductForm from './ProductForm'

const ProductAdd = () => {
  const [data, setData] = useState(
    {
      brand: 'Nike',
      type: 'Trainers',
      colour: 'black',
      size: '5',
      price: 99.99,
      categorys: ['2'],
      description: 'New',
      image: 'https://media.gq-magazine.co.uk/photos/5eda54b1dc844dac8d6d3db7/master/w_1920,h_1280,c_limit/20200605-nike-09.jpg',
    })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  
  const navigate = useNavigate()

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
        
    const config = getAxiosRequestConfig('/products', data)

    try {
      const response = await axios(config).catch(handleError)
      console.log(response.data)
      setIsError(false)
      navigate(`/products/${response.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const formInputProps = { data, errorInfo, handleFormChange }
  
  return (
    <div className="form-box">
      <h1>Add a Product</h1>
      <Form onSubmit={handleSubmit} className="form">
        <ProductForm formInputProps={formInputProps} />
        <div>
          <Form.Control id="submit-button" type="submit" value="Add Product" />
        </div>
        {isError ? (
          <div className="error">
            <p>Error. Please try again</p>
          </div>
        ) : (
          <></>
        )}
      </Form>
    </div>
  )
}

export default ProductAdd
