/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from 'axios'

export const API_URL = 'http://localhost:8080/api';

export const apiErrorCode = {
  unauthorized: 401,
  accessDenied: 430,
  sessionExpired: 423,
  validationError: 400,
  emailNotVerified: 403,
  internalError: 500
}

export const apiSuccessCode = {
  success: 200
}

export const $axios = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
})

$axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : sessionStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      config.headers.Authorization = 'Basic c2xpY2U6c2xpY2VAMTIz'
    }
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

export const $axiosForm = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  }
})

$axiosForm.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : sessionStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      config.headers.Authorization = 'Basic c2xpY2U6c2xpY2VAMTIz'
    }
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)
