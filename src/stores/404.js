import {defineStore} from 'pinia'
import router from '@/router/index.js';


export const use404Store = defineStore('404', {
    state: () => ({
        from: null,
        to: null,
        msg: null
    }),
    actions: {
        // 重置状态
        reset() {
            this.setFrom(null)
            this.setTo(null)
            this.setMsg(null)
        },
        setFrom(from_path) {
            this.from = from_path;
        },
        setTo(to_path) {
            this.to = to_path;
        },
        setMsg(msg) {
            this.msg = msg;
        },
    },
    getters: {},
    persist: {
        enabled: true,
    }
})


