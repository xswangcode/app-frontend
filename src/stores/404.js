import {defineStore} from 'pinia'


export const use404Store = defineStore('404', {
    state: () => ({
        from: null,
        to: null,
        msg: null
    }),
    actions: {
        // 重置状态
        reset() {
            this.setInfo(null, null, null)
        },
        setInfo(from, to, msg) {
            this.from = from;
            this.to = to;
            this.msg = msg;
        },
    },
    getters: {},
    persist: {
        enabled: false,
    }
})


