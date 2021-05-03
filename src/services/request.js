import axios from 'axios';
import { message } from 'antd'
import { BASE_URL, TIMEOUT } from "./config";
import { loginRefreshApi } from "@/services/login";

function request(config) {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: TIMEOUT,
        method: 'post',
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        console.log(333, res)

        if (res.data.code === "F-000-000-403") {/* token过期，重新获取新的token用于存储 */
            loginRefreshApi({token: localStorage.getItem("refreshToken")}).then((res)=>{
                localStorage.setItem('Authorization', res.result.token)
            })
        }

        else if (res.data.code === "F-000-000-413") { /* 无效token，不可使用，重新登录 */
            message.warning(res.data.msg);
            localStorage.removeItem('Authorization');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            localStorage.removeItem('Router');
            window.location.replace('/#/login/')
        }

        else if (res.data.code === "F-000-000-500" ) { /* 系统错误 */
            message.warning(res.data.msg)
        }

        else if (res.data.code === undefined) {
            return res
        }

        else {
            return res.data
        }
    })

    //请求拦截
    instance.interceptors.request.use((res) => {
        if (localStorage.getItem("Authorization")) {
            res.headers["token"] = localStorage.getItem("Authorization")
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
