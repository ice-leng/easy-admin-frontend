import axios from 'axios';
import { message } from 'antd'
import { BASE_URL, TIMEOUT } from "./config";


export function request(config) {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: TIMEOUT,
        method: 'post'
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        if (res.data.code === 502) {
            localStorage.removeItem("Dense-Diary-team-Authorization")
            message.warning('登录过期，请重新登录')
            window.location.replace('/#/login/')
        }
        return res.data
    })

    //请求拦截
    instance.interceptors.request.use((res) => {
        if (localStorage.getItem("Dense-Diary-team-Authorization") || !res.headers["Authorization"]) {
            res.headers["Authorization"] = "Bearer " + localStorage.getItem("Dense-Diary-team-Authorization");

        } else {
            //登录校验
            if (!res.url.includes('login/login')) {
                window.location.replace('/#/login/')
            }
        }
        return res
    }, (error) => {

        return Promise.reject(error)
    })

    // 捕获http状态码错误
    return new Promise((resolve, reject) => {
        instance(config).then(res => {
            resolve(res)
        }).catch(err => {
            if (err.response) {
                // 错误信息
                console.log(err.response);
            }
        })
    })
}

export default request;