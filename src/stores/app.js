import {defineStore} from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        routers: [],
        menus: [],
        userinfo: {},
        login_status: false,
    }),

    actions: {
        // 重置状态
        resetState() {
            this.routers = [];
            this.menus = [];
            this.userinfo = {};
            this.login_status = false;
        },

        // 设置菜单和路由，可以合并为一个通用的方法
        setData(key, value) {
            if (key === 'routers') {
                this.routers = value;
            } else if (key === 'menus') {
                this.menus = value;
            } else if (key === 'userinfo') {
                this.userinfo = value;
            }
        },

        // 设置登录状态
        setLogin(status) {
            this.login_status = status;
            if (process.env.NODE_ENV !== 'production') {
                console.log(status ? "登录成功" : "退出登录");
            }
        },
    },

    persist: {
        enabled: true,
        // 可以指定需要持久化的字段，例如只持久化 `login_status` 和 `userinfo`
        paths: ['login_status', 'userinfo']
    },
});
