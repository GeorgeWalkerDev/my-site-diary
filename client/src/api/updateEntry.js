import { apiUrl } from '../utils';

export const updateEntry = async (newDiary, id) => {  
    const res = await fetch(`${apiUrl}/api/diaries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newDiary),
    })
  
    return await res.json();
  
  }