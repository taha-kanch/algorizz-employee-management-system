import { apiErrorCode, $axios, API_URL, $axiosForm } from './axios.instance'

const StatusCode = apiErrorCode
export const checkUserValidation = (data) => {
  if (data && data.statusCode) {
    const { statusCode: stc } = data
    return (
      stc === StatusCode.sessionExpired ||
      stc === StatusCode.unauthorized ||
      stc === StatusCode.accessDenied
    )
  }
  return false
}

const getApiCall = (
  endPoint,
  params,
  successCallback,
  errorCallback
) => {
  $axios
    .get(API_URL + endPoint + params, {})
    .then((res) => {
      successCallback(res)
    })
    .catch((err) => {
      if (err?.response?.data.statusCode === 401) {
        errorCallback(err.response.data)
      }
      if (err.code === 'ECONNABORTED') {
        errorCallback({
          data: {
            statusCode: 408
          }
        })
      } else if (err.response && checkUserValidation(err.response.data)) {
        errorCallback(err.response.data)
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: '',
            message: 'Please try again later'
          }
        })
      }
    })
}

const postApiCall = (
  endPoint,
  params,
  successCallback,
  errorCallback
) => {
  $axios
    .post(API_URL + endPoint, params)
    .then((res) => {
      successCallback(res)
      console.log(res.data)
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        errorCallback({
          data: {
            statusCode: 408
          }
        })
      } else if (err.response && checkUserValidation(err.response.data)) {
        console.log(err.response);
        errorCallback(err.response)
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: '',
            message: 'Please try again later'
          }
        })
      }
    })
}

const putApiCall = (
  endPoint,
  params,
  successCallback,
  errorCallback
) => {
  $axios
    .put(API_URL + endPoint, params)
    .then((res) => {
      successCallback(res)
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        errorCallback({
          data: {
            statusCode: 408
          }
        })
      } else if (err.response && checkUserValidation(err.response.data)) {
        errorCallback(err.response)
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: '',
            message: 'Please try again later'
          }
        })
      }
    })
}

const patchApiCall = (
  endPoint,
  params,
  successCallback,
  errorCallback
) => {
  $axios
    .patch(API_URL + endPoint, params)
    .then((res) => {
      successCallback(res)
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        errorCallback({
          data: {
            statusCode: 408
          }
        })
      } else if (err.response && checkUserValidation(err.response.data)) {
        errorCallback(err.message)
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: '',
            message: 'Please try again later'
          }
        })
      }
    })
}

const deleteApiCall = (
  endPoint,
  params,
  successCallback,
  errorCallback
) => {
  $axios
    .delete(API_URL + endPoint, params)
    .then((res) => {
      successCallback(res)
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        errorCallback({
          data: {
            statusCode: 408
          }
        })
      } else if (err.response && checkUserValidation(err.response.data)) {
        errorCallback(err.message)
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: '',
            message: 'Please try again later'
          }
        })
      }
    })
}

const postApiCallForm = (
  endPoint,
  params,
  successCallback,
  errorCallback
) => {
  $axiosForm
    .post(API_URL + endPoint, params)
    .then((res) => {
      successCallback(res)
      console.log(res.data)
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        errorCallback({
          data: {
            statusCode: 408
          }
        })
      } else if (err.response && checkUserValidation(err.response.data)) {
        errorCallback(err.response)
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: '',
            message: 'Please try again later'
          }
        })
      }
    })
}

const patchApiCallForm = (
  endPoint,
  params,
  successCallback,
  errorCallback
) => {
  $axiosForm
    .patch(API_URL + endPoint, params)
    .then((res) => {
      successCallback(res)
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        errorCallback({
          data: {
            statusCode: 408
          }
        })
      } else if (err.response && checkUserValidation(err.response.data)) {
        errorCallback(err.message)
      } else if (!err.response) {
        errorCallback({
          data: {
            statusCode: '',
            message: 'Please try again later'
          }
        })
      }
    })
}

const api = {
  getApiCall,
  postApiCall,
  putApiCall,
  patchApiCall,
  deleteApiCall,
  postApiCallForm,
  patchApiCallForm
}
export default api
