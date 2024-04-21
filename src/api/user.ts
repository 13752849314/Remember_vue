import {$get, $post} from "../utils/request.ts";

export const $Login = async (params: object) => {
    let ret = await $post("user/login", params)
    if (ret.code === "200") {
        localStorage.setItem('jwt', ret.data.jwt)
        return true
    }
    return false
}

export const $GetInfo = async () => {
    return await $get('user/info')
}

export const $Logout = async () => {
    return await $post('user/logout')
}

export const $GetUsers = async () => {
    return await $get('user/user')
}

export const $AddUser = async (params: object) => {
    return await $post('/user/add', params)
}

export const $Delete = async (username: string) => {
    return await $post('/user/delete', {"username": username})
}

export const $ChangeInfo = async (params: object, id: string) => {
    return await $post('/user/changeI/' + id, params)
}
