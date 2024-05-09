import {createRouter, createWebHistory} from 'vue-router'
import API from "@/api/api.js";
import {getVal, getToken} from "@/utils/StoreUtil.js";
import {parseMenuToRouter} from "@/utils/MenuUtils.js";
import {ElMessage} from 'element-plus'
import {use404Store} from "@/stores/404.js";
import {useTabsStore} from "@/stores/tabs.js";

const modules = import.meta.glob('./../views/**/*.vue');
console.log(modules);
let routers = []


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: routers
})

if (!sessionStorage.app || !JSON.parse(sessionStorage.app).login_status) {
    // 未登录- 加载公用菜单
    await API.menu_group.getMenuCommon().then(res => {
        console.log(res);
        routers = parseMenuToRouter(res.result, router)
    })
} else {
    routers = JSON.parse(sessionStorage.app).routers
    routers = parseMenuToRouter(routers, router)
}


router.beforeEach((to, from) => {
    if (!router.hasRoute(to.name)) {
        const store404 = use404Store()
        console.log(store404);
        store404.setMsg("没有找到路由")
        store404.setFrom(from.path)
        store404.setTo(to.path)
        return {path: '/404'};
    } else if (!getToken() && !router.hasRoute(to.name)) {
        ElMessage.error("身份信息丢失,请重新登录")
        return {path: '/login'}
    }
    const tabsStore = useTabsStore();
    tabsStore.addTabs({
        name:to.name,
        path:to.path,
    })
    console.log("前置守卫", to, from)
    // 添加参数
    // return {path: to.path, params: {query: 12321312}};
})
router.onError((handler) => {
    console.log("错误处理");
    console.log(handler);
})

export default router


