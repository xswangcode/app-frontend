import {createRouter, createWebHistory} from 'vue-router'
import API from "@/api/api.js";
import {parseMenuToRouter} from "@/utils/MenuUtils.js";
import {Logout_System} from "@/utils/SystemUtils.js";
import {useAppStore} from "@/stores/app.js";
import {useTabsStore} from "@/stores/tabs.js";
import {use404Store} from "@/stores/404.js";

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
    const store404 = use404Store();

    console.log(from.path + " ==> " + to.path)
    if (!appStore.login_status) {
        if (to.path === "/login")
            next()
        else {
            Logout_System();
            next("/login")
        }
    } else if (appStore.routers.filter(x => x.path === to.path).length === 0) {
        store404.setInfo(from.path, to.path, "找不到指定的页面！")
        next("/404")
    } else {
        // 在正常情况下
        tabsStore.addTab({
            name: to.name,
            path: to.path
        })
        next()
    }

})
router.onError((handler) => {
    console.log(handler);
})

export default router


