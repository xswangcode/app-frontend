import {getAction, postAction} from "@/api/request.js";


const login_group = {
    login: (params) => postAction("/login", params),
    test: (params) => postAction("/test/test1", params)
}

const menu_group = {
    // 获取菜单
    getMenu: (params) => getAction("/system/sysmenu/getMenuTreeList", params),
    getMenuCommon: (params) => getAction("/system/sysmenu/getMenuCommon", params),

}


export default {
    login_group: login_group,
    menu_group: menu_group
}