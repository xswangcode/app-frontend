import router from "@/router/index.js"
import {useAppStore} from "@/stores/app.js"
import {useTabsStore} from "@/stores/tabs.js"

/**
 * 退出登录， 待测试
 */
export const Logout_System = () => {
    const tabsStore = useTabsStore()
    const appStore = useAppStore()
    router.push('/login')
    appStore.resetState()
    localStorage.clear()
    sessionStorage.clear()
    tabsStore.reset()
}


