import { Navigate } from 'react-router-dom'

function PrivateRouteAdmin ({ children }) {
  const authAdmin = localStorage.getItem('accessToken');
  const roleAdmin = localStorage.getItem('role') == 'ADMIN';
  return authAdmin && roleAdmin ? children : <Navigate to={"/login"} />
}

export default PrivateRouteAdmin;
