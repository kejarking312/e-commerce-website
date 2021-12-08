import axios from 'axios'
import * as React from 'react' 
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getToken } from '../helpers/auth'
import { fetchOneProduct } from '../helpers/api'
import ProductForm from './ProductForm'
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

const ProductEdit = () => {
  const [data, setData] = useState({
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
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchOneProduct(id).then(setData)
  }, [id])

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }



  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = {
      method: 'put',
      url: `http://localhost:8000/api/products/${id},`,
      headers: { 
        Authorization: `${getToken()}`, 
        'Content-Type': 'application/json',
      },
      data: data,
    }

    // const config = getAxiosRequestConfig(`/products/${id}`, product, 'put')

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

  const formInputProps = { data: data, errorInfo, handleFormChange }

  return (
    <div className="form-section">
      <div className="form-box">
        <Form className="form" onSubmit={handleSubmit}>
          <h1>Edit your Item</h1>
          <ProductForm formInputProps={formInputProps} />
          <div>
            <Form.Control type="submit" value="Edit" />
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

export default ProductEdit
