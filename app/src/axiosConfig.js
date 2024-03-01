import axios from 'axios';

export const URL = 'https://employeemng-server.onrender.com';
const mainUrl = 'https://employee-mng-nine.vercel.app'

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
},
);
instance.interceptors.response.use((res)=>{
    return res;
},async (error) => {
    console.log('ddddddddddddddd')
    console.log(error.response?.status == 401 && window.location.href !== `${mainUrl}/login`,'kkk')
    if(error.response?.status == 401 && window.location.href !== `${mainUrl}/login`){
        localStorage.removeItem('loginUser');
        localStorage.removeItem('loginAdmin');
        localStorage.removeItem('token');
        window.location.href = '/login';     
        return ;
    }else{            
            return Promise.reject(error);    
    }
})



export default instance;
