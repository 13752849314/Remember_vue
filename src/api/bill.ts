import {$get} from "../utils/request.ts";

export const $getBillByUsername = async () => {
    return await $get('/bill/bill')
}