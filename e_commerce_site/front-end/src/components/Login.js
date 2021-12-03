import React, { useState } from 'react'
import axios from 'axios'
import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = JSON.stringify({
      email,
      password,
    })
    
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/auth/login/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config)
      setToken(response.data.token)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h1>Sign in to Shop</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="email@email.com" type='text' value={email} onChange={handleEmailChange} />
        <input placeholder="password" type='password' value = {password} onChange={handlePasswordChange} />
        <input type='submit' value='login' />
      </form>
    </div>
  )
}

export default Login
