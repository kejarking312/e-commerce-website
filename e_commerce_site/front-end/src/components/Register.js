import React, { useState } from 'react'
import axios from 'axios'
import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import FormInput from './FormInput'
import Form from 'react-bootstrap/Form'
// import { getAxiosRequestConfig } from '../helpers/api'


const Register = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
  })

  const [errorInfo, setErrorInfo] = useState({})

  const [isError, setIsError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/auth/login/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config).catch(handleError)
      setToken(response.data.token)
      setIsError(false)
      navigate('/login')
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }

  const formInputProps = { data, errorInfo, handleFormChange }

  return (
    <div className="form-div">
      <div className="form-box">
        <Form onSubmit={handleSubmit}>
          <h1>Sign in to Shop</h1>
          <FormInput 
            placeholder="username" 
            type='text' 
            name='username' 
            {...formInputProps} />
          <FormInput 
            placeholder="email@email.com" 
            type='text' 
            name='email' 
            {...formInputProps} />
          <FormInput 
            placeholder="password" 
            type='password' 
            name='password' 
            {...formInputProps} />
          <FormInput 
            placeholder="confirm password" 
            type='password' 
            name='password_confirmation' 
            {...formInputProps} />
          <FormInput 
            placeholder="first name" 
            type='text' 
            name='first_name' 
            {...formInputProps} />
          <FormInput 
            placeholder="surname" 
            type='text' 
            name='last_name' 
            {...formInputProps} />
          <FormInput 
            placeholder="phone" 
            type='text' 
            name='phone' 
            {...formInputProps} />
          <FormInput 
            placeholder="address" 
            type='text' 
            name='address' 
            {...formInputProps} />
          <Form.Control type='submit' value='register' />
          {isError ? (
            <div className='error'>
              <p>Error. Please try again.</p>
            </div> 
          ) : (
            <></>
          )}
        </Form>
      </div>
    </div>
  )
}

export default Register
