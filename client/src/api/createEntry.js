import { apiUrl } from '../utils'

export const createEntry = async (diary) => {
    const res = await fetch(`${apiUrl}/api/diaries/add`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(diary),
    })

    return await res.json();
  }