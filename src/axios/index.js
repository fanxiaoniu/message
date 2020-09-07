import axios from 'axios'
import router from '../router'

export default function (config) {
    let instance = axios.create({
        baseURL: 'http://gb.lpykyz.com',
        timeout: 5000
    })

    instance.interceptors.request.use(config => {         
        let userInfo = sessionStorage.getItem('userInfo')
        if (userInfo) {
            let token = JSON.parse(userInfo).access_token || ''
            config.headers.Authorization = `Bearer ${token}`
        }
        return config

    }, error => {
        return Promise.reject(error);
    })

    instance.interceptors.response.use(response => {
        if(response.data.code === "4001"){
            router.replace("/Login");
        }else{
            return response.data;
        }
    }, error => {
        return Promise.reject(error);
    });
    return instance(config)
}