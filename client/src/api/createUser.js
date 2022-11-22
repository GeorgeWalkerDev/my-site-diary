import { apiUrl } from '../utils'
import axios from "axios";

// export const createUser = async (user) => {
//     const res = fetch(`${apiUrl}/api/users`, {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify(user)
//     })
//     return await res.json();
// }

export const createUser = (user) => {
    axios.post(`${apiUrl}/api/users`, user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };