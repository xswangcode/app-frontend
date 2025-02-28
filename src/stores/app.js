import {defineStore} from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        routers: [],
        menus: [],
        userinfo: {},
        login_status: false,
        isCollapse: false,
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
        // 切换 isCollapse 的状态
        changeCollapse() {
            this.isCollapse = !this.isCollapse;
            // 在生产环境中可以去除 console.log，或者通过条件判断来控制是否打印
            if (process.env.NODE_ENV !== 'production') {
                console.log(this.isCollapse);
            }
        },
    },

    persist: {
        enabled: true,
        // 可以指定需要持久化的字段，例如只持久化 `login_status` 和 `userinfo`
        paths: ['login_status', 'userinfo', "isCollapse"]
    },
});
