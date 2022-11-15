import { apiUrl } from '../utils';

export const fetchEntries = async () => {
    const res = await fetch(`${apiUrl}/api/diaries`);
    return await res.json();
  };