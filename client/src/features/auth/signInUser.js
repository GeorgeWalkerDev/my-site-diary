import { apiUrl } from '../../utils';
import { setCookie } from '../../helpers/helpers';

export const signInUser = async (user) => {
  const res = await fetch(`${apiUrl}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
  });
  const data = await res.json();
  setCookie('accessToken', data.accessToken, 1);
};
