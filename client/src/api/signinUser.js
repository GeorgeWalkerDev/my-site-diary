import { apiUrl } from '../utils'
import axios from "axios";

export const signInUser = (user) => {
    axios.post(`${apiUrl}/api/auth/signin`, user)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

// export const signInUser = async (user) => {
//     const res = await fetch(`${apiUrl}/api/auth/signin`, {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify(user),
//         credentials: 'include'
//     })
// }