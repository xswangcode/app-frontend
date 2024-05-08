import axios from 'axios'
import {APP_CONFIG} from '@/web.config.js';
import {getToken,setToken} from "@/utils/StoreUtil.js";

const instance = axios.create({
    baseURL: APP_CONFIG.APP_SERVER_BASE_URL,
    timeout: 3000,
})

//region 配置instance
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.delete("X-Auth-Token")
    let token = getToken();{
        config.headers["X-Auth-Token"] = getToken()
    }

    console.log("请求拦截器",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log("axios请求出错了：", error)
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if (response.headers["x-auth-token"]) {
        setToken(response.headers["x-auth-token"])
    }
    console.log(response)
    if (response.data.code > 400 && response.data.code < 500) {
        console.error(response.data.message)
    }
    if (response.data.code >= 500) {
        console.error(response.data.message)
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

//endregion


//region 通用请求方法
export function getAction(url, parameter) {
    return instance({
        url: url,
        method: 'get',
        params: parameter,
    })
}

export function postAction(url, parameter) {
    return instance({
        url: url,
        method: 'post',
        data: parameter,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export function putAction(url, parameter) {
    return instance({
        url: url,
        method: 'put',
        data: parameter,
    })
}

export function deleteAction(url, parameter) {
    return instance({
        url: url,
        method: 'delete',
        params: parameter
    })
}

//endregion


export default instance
