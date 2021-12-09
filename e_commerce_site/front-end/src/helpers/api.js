import axios from 'axios'
import { getToken } from './auth'

export const fetchAllProducts = async () => {
  const config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/api/products/',
    headers: {},
  }
  const response = await axios(config)
  return response.data
}

export const fetchOneProduct = async (id) => {
  const config = {
    method: 'get',
    url: `http://127.0.0.1:8000/api/products/${id}`,
    headers: {},
  }
  const response = await axios(config)
  return response.data
}

export const deleteProduct = async (id) => {
  const config = {
    method: 'delete',
    url: `http://127.0.0.1:8000/api/products/${id}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }
  const response = await axios(config)
  return response.data
}

const makeAxiosRequest = async (url, data) => {
  const config = getAxiosRequestConfig(url, data)

  const response = await axios(config)
  return response.data
}

export const login = async (data) => {
  return makeAxiosRequest('/login', data)
}

export const register = (data) => {
  return makeAxiosRequest('/register', data)
}

export const getAxiosRequestConfig = (requestUrl, data, method = 'post') => {
  const config = {
    method,
    url: `/api${requestUrl}`,
    headers: {
      Authorization: `${getToken()}`,
      'Content-Type': 'application/json',
    },
    data,
  }
  return config
}
