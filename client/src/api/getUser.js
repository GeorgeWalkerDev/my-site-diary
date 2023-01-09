import { apiUrl } from '../utils'
import axios from 'axios'

export const getUser = async () => {
  // console.log('get')
  // const res = await fetch(`${apiUrl}/api/users/user_data`, {credentials: 'include'})
  // const data = await res.json()
  try {
    const response = await axios.get(`${apiUrl}/users/user_data`, {withCredentials: true});
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
