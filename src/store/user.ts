import {defineStore} from 'pinia'

export default defineStore('user', {
    state() {
        return {
            user: {
                roles: '',
                username: '',
            }
        }
    },
    actions: {
        setUser(user: object) {
            // @ts-ignore
            this.user = user
        },
        clearUser() {
            // @ts-ignore
            this.user = {}
        }
    },
    persist: true
})