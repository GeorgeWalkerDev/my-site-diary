import { Navigate } from 'react-router-dom'
import { getCookie } from '../helpers/helpers'

const PrivateRoute = ({ children }) => {
    const cookie = getCookie('accessToken')
    return cookie ? children : <Navigate to="/"/>
}

export default PrivateRoute