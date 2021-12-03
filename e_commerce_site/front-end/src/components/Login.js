import React, { useState } from 'react'
import axios from 'axios'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = JSON.stringify({
      email: 'shak@email.com',
      password: 'emre190720',
    })
    
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/auth/login/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    const response = await axios(config)
    console.log(response)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  return (
    <div>
      <h1>Sign in to Shop</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="email@email.com" type='text' onChange={handleEmailChange} />
        <input placeholder="password" type='password' />
        <input type='submit' value='login' />
      </form>
    </div>
  )
}

export default Login
