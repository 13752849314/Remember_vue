import {$get, $post} from "../utils/request.ts"

export const $getBillByUsername = async () => {
    return await $get('/bill/bill')
}

export const $addBill = async (params: object) => {
    return await $post('/bill/add', params)
}

export const $deleteById = async (id: string) => {
    return await $post("/bill/delete/" + id)
}

export const $changeBill = async (params: object, id: string) => {
    return await $post('/bill/changeBI/' + id, params)
}