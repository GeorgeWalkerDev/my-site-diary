// eslint-disable-next-line import/no-extraneous-dependencies
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = 'User';

  if (token) {
    const decoded = jwtDecode(token);
    const { email, firstName, lastName, roles } = decoded.UserInfo;

    isManager = roles.includes('Manager');
    isAdmin = roles.includes('Admin');

    if (isManager) status = 'Manager';
    if (isAdmin) status = 'Admin';

    return { email, firstName, lastName, roles, status, isManager, isAdmin };
  }

  return { username: '', roles: [], isManager, isAdmin, status };
};
export default useAuth;
