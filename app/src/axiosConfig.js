import axios from 'axios';

export const URL = 'http://localhost:10000';
const mainUrl = 'http://localhost:5173'

const instance = axios.create({
    baseURL: URL,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id'); 
    if (token) {
        config.headers['authorization'] = 'Bearer ' + token;
    }
    if (id) {
        config.headers['id'] = id;
    }

    return config;
});



export default instance;
