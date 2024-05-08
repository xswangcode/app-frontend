import {defineStore} from 'pinia'
import  router from '@/router/index.js';


export const useAppStore = defineStore('app', {
    state: () => ({
        routers: [],
        menus: [],
        userinfo: {},
        login_status: false,
        token: '',
    }),
    actions: {
        // 重置状态
        resetState() {
            // this.routers = [];
            this.setRouters([])
            this.menus = [];
            this.userinfo = {};
            this.login_status = false;
            this.setToken(null)
        },
        setMenu(menu) {
            this.menus = menu;
        },
        setRouters(routers) {
            this.routers = routers
        },
        setLogin(status) {
            this.login_status = status
            console.log(status ? "登录成功" : "退出登录");
        },
        setToken(new_token){
            this.token = new_token;
        },
        clearToken(){
            this.setToken(null)
        }
    },
    getters: {},
    persist: {
        enabled: true,
    }
})


