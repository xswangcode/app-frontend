import router from "@/router/index.js"
import {useAppStore} from "@/stores/app.js"
import {useTabsStore} from "@/stores/tabs.js"

const getTabsStore = () => useTabsStore()
const getAppStore = () => useAppStore()

/**
 * 退出登录， 待测试
 */
export const Logout_System = () => {
    router.push('/login')
    getAppStore().resetState()
    localStorage.clear()
    getTabsStore().reset()
}


