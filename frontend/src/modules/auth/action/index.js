import { signin } from '../slice'
import { Utils } from '../../../utils'

export const login = (values, setSubmitting, navigate, dispatch) => {
  const dataToSend = {
    ...values
  }
  console.log(dataToSend)
  Utils.api.postApiCall(
    `/auth/login`,
    dataToSend,
    (respData) => {
      const { data } = respData;
      Utils.showAlert(1, "Login successful");
      dispatch(signin({ data: data }))
      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('role', data.user.role);

      if (data.user.role == "ADMIN") {
        navigate(`/admin`);
      } 
      else if (data.user.role == "EMPLOYEE") {
        navigate(`/employee`);
      }
      setSubmitting(false);
    },
    (error) => {
      Utils.showAlert(2, "Invalid Credentials",)
      setSubmitting(false)
      dispatch(signin({ data: {} }))
    }
  )
}
