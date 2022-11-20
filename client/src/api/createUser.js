import { apiUrl } from '../utils'

export const createUser = async (user) => {
    const res = fetch(`${apiUrl}/api/users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    return await res.json();
}