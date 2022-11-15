import { apiUrl } from '../utils';

export const fetchEntry = async (id) => {
    const res = await fetch(`${apiUrl}/api/diaries/${id}`);
    return await res.json();
  }
