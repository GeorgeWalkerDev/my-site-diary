import { apiUrl } from '../utils'
export const deleteEntry = async (id) => {
    const res = await fetch(`${apiUrl}/api/diaries/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    return res;
  }