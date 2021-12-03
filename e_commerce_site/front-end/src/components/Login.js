import React, { useState } from 'react'
import axios from 'axios'
import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'


const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = ({
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
      setIsLoggedIn(true)
      setIsError(false)
      navigate('/')
    } catch (err) {
      console.log(err)
      setIsError(true)
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
      <form onSubmit={handleSubmit}>
        <h1>Sign in to Shop</h1>
        <div>
          <input placeholder="email@email.com" type='text' value={email} onChange={handleEmailChange} />
          <input placeholder="password" type='password' value = {password} onChange={handlePasswordChange} />
          <input type='submit' value='login' />
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

export default Login
