import React, { useState } from 'react'
import axios from 'axios'
import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'


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

  const [isError, setIsError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/auth/register/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config)
      setToken(response.data.token)
      setIsError(false)
      navigate('/')
    } catch (err) {
      console.log(err)
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign in to Shop</h1>
        <div>
          <input placeholder="username" type='text' name='username' value={data.username} onChange={handleFormChange} />
          <input placeholder="email@email.com" type='text' name='email' value={data.email} onChange={handleFormChange} />
          <input placeholder="password" type='password' name='password' value = {data.password} onChange={handleFormChange} />
          <input placeholder="confirm password" type='password' name='password_confirmation' value={data.password_confirmation} onChange={handleFormChange} />
          <input placeholder="first name" type='text' name='first_name' value = {data.first_name} onChange={handleFormChange} />
          <input placeholder="surname" type='text' name='last_name' value = {data.last_name} onChange={handleFormChange} />
          <input placeholder="phone" type='text' name='phone' value = {data.last_name} onChange={handleFormChange} />
          <input placeholder="address" type='text' name='address' value = {data.address} onChange={handleFormChange} />
          <input type='submit' value='register' />
        </div>
        {isError ? (
          <div className='error'>
            <p>Error. Please try again.</p>
          </div> 
        ) : (
          <></>
        )}
      </form>
    </div>
  )
}

export default Register
