import axios from 'axios'
import * as React from 'react' 
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneProduct, getAxiosRequestConfig } from '../helpers/api'
import ProductForm from './ProductForm'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ProductEdit = () => {
  const [product, setProduct] = useState({
    brand: '',
    type: '',
    colour: '',
    size: '',
    price: '',
    categorys: [],
    description: '',
    image: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchOneProduct(id).then(setProduct)
  }, [id])

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = getAxiosRequestConfig(`/products/${id}`, product, 'put')

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
    setProduct({
      ...product,
      [name]: value,
    })
  }

  const formInputProps = { data: product, errorInfo, handleFormChange }

  return (
    <div className="form-box">
      <Form className="form" onSubmit={handleSubmit}>
        <h1>Edit a Product</h1>
        <ProductForm formInputProps={formInputProps} />
        <div>
          <Form.Control type="submit" value="Edit Product" />
        </div>
        <div>
          <Button className="button" onClick={() => navigate(-1)}>go back</Button>
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

export default ProductEdit
