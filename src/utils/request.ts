import axios from "axios"
import {baseURL} from "../config/baseURL.ts"
import {ElNotification} from "element-plus"

const instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
})

instance.interceptors.request.use(function (config) {
    config.headers['jwt'] = localStorage.getItem('jwt')
    return config
})
instance.interceptors.response.use(function (response) {
    if (response.data.code === "200") {
        ElNotification({
            title: '通知',
            message: response.data.data.message,
            type: 'success',
            position: 'bottom-left',
        })
    } else {
        ElNotification({
            title: '通知',
            message: response.data.data.message,
            type: 'error',
            position: 'bottom-left',
        })
    }
    console.log(response.data.data.message)
    return response
})

export const $get = async (url: string, params: object = {}) => {
    let {data} = await instance.get(url, {params})
    return data
}

export const $post = async (url: string, params: object = {}) => {
    let {data} = await instance.post(url, params)
    return data
}