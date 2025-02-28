import {createRouter, createWebHistory} from 'vue-router'
import API from "@/api/api.js";
import {parseMenuToRouter} from "@/utils/MenuUtils.js";
import {useAppStore} from "@/stores/app.js";
import {useTabsStore} from "@/stores/tabs.js";


const modules = import.meta.glob('./../views/**/*.vue');

let routers = []


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: routers
})
if (!sessionStorage.app || !JSON.parse(sessionStorage.app).login_status) {
    // 未登录- 加载公用菜单
    await API.menu_group.getMenuCommon().then(res => {
        routers = parseMenuToRouter(res.result, router)
    })
} else {
    routers = JSON.parse(sessionStorage.app).routers
    routers = parseMenuToRouter(routers, router)
}


router.beforeEach((to, from, next) => {
    const appStore = useAppStore();
    const tabsStore = useTabsStore();

    if (!appStore.login_status && to.path !== "/login") {
        tabsStore.setTabs([]);  // 清空 tabs
        next('/login');  // 跳转到登录页面
    } else {
        tabsStore.addTab({
            name: to.name,
            path: to.path
        })
        console.log(tabsStore.tabs);
        next();
    }
})
router.onError((handler) => {
    console.log(handler);
})

export default router


