import { apiUrl } from '../utils';
import { getCookie } from '../helpers/helpers'

export const fetchEntries = async () => {
    let accessToken = getCookie('accessToken')
    const res = await fetch(`${apiUrl}/api/diaries`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    });
    const data = await res.json();
    return data
  };