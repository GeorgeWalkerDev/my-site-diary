import { apiUrl } from '../utils'

export const signinUser = async (user) => {
    const res = await fetch(`${apiUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    console.log(res)
}