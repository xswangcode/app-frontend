import {defineStore} from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        isCollapse: false,
    }),

    persist: {
        enabled: true, // 启用持久化存储
    },

    actions: {
        // 切换 isCollapse 的状态
        changeCollapse() {
            this.isCollapse = !this.isCollapse;
            // 在生产环境中可以去除 console.log，或者通过条件判断来控制是否打印
            if (process.env.NODE_ENV !== 'production') {
                console.log(this.isCollapse);
            }
        },
    },
});
