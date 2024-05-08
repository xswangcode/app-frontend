import {defineStore} from 'pinia'


export const useMenuStore = defineStore('menu', {
    state: () => ({
        isCollapse: false
    }),
    getters: {},
    persist: {
        enabled: true,
    },
    actions: {
        changeCollapse() {
            this.isCollapse = !this.isCollapse;
            console.log(this.isCollapse);
        }
    }
})