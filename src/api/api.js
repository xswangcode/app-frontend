import service from "@/api/request.js";
import {getAction, postAction, putAction, deleteAction} from "@/api/request.js";
import {setToken} from "@/utils/StoreUtil.js";


const login_group = {
    login: (params) => postAction("/user/login", params).then(res => {
        if (res.code === 200) setToken(res.message);
        return res
    }),
    test: (params) => postAction("/user/jwttest", params)
}

const menu_group = {
    // 获取菜单
    getMenu: (params) => getAction("/menu/getMenuTreeList", params),
    getMenuCommon: (params) => getAction("/menu/getMenuCommon", params),

}


export default {
    login_group: login_group,
    menu_group: menu_group
}