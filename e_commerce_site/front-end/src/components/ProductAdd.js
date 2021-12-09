import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../helpers/auth'
// import { getAxiosRequestConfig } from '../helpers/api'

import ProductForm from './ProductForm'

const ProductAdd = () => {
  const [data, setData] = useState(
    {
      brand: '',
      product_model: '',
      type: '',
      colour: '',
      size: '',
      price: '',
      discount_price: '',
      label: '',
      categorys: '',
      description: '',
      image_1: '',
      image_2: '',
      image_3: '',
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
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/products/',
      headers: { 
        Authorization: `Bearer ${getToken()}`, 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    

    try {
      const response = await axios(config).catch(handleError)
      console.log(response.data)
      setIsError(false)
      navigate(`/products/${response.data.id}`)
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
    <div className="form-section">
      <div className="form-box">
        <h1>Add your Item</h1>
        <Form onSubmit={handleSubmit} className="form">
          <ProductForm formInputProps={formInputProps} />
          <div>
            <Form.Control id="submit-button" type="submit" value="Add Item" />
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
    </div>
  )
}

export default ProductAdd
