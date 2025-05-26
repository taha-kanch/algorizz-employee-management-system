import axios from 'axios'

const API_URL = 'http://localhost:8080/api';

const apiErrorCode = {
  unauthorized: 401,
  accessDenied: 430,
  sessionExpired: 423,
  validationError: 400,
  emailNotVerified: 403,
  internalError: 500
}
const apiSuccessCode = {
  success: 200
}

const $axios = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    platform: 3,
    timezone: 0,
    language: 'en',
    offset: 0,
    api_key: 1234
    // authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
})

$axios.interceptors.request.use(
  (config) => {
    const token = (localStorage.getItem('accessToken') != null)
      ? localStorage.getItem('accessToken')
      : sessionStorage.getItem('accessToken')
    if (token != null) {
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

const constants = {
  apiErrorCode,
  API_URL,
  apiSuccessCode,
  axios: $axios,
}
export default constants
