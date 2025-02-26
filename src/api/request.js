import axios from 'axios'
import {APP_CONFIG} from '@/web.config.js';
import {Logout_System} from "@/utils/SystemUtils.js"

const instance = axios.create({
    baseURL: APP_CONFIG.APP_SERVER_BASE_URL,
    withCredentials: true,
    timeout: 3000,
})


//region 配置instance
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    let data = response.data
    // 未认证
    if (data.code === 401) {
        Logout_System();
        return data;
    }
    if (data.code !== 200) {
        console.error(data.message)
    }
    return data;
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
