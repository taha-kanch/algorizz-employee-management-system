import { Navigate } from 'react-router-dom'

function PrivateRouteEmployee({ children }) {
  const authEmployee = localStorage.getItem('accessToken');
  const roleEmployee = localStorage.getItem('role') == 'EMPLOYEE';
  return authEmployee && roleEmployee ? children : <Navigate to={"/login"} />
}

export default PrivateRouteEmployee;
