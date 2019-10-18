import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
//Axios request to retrieve token from server so I can use token to interact with API.
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        }
    });
};