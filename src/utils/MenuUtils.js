const modules = import.meta.glob('./../views/**/*.vue');
const _parseMenuToRouter = (el) => {
    if (!el) return null;
    if(el.meta){
        el = el.meta
    }
    let componentUrl = `../views/${el.componentUrl || ''}.vue`;
    let children = el.children ? el.children.map(item => {
        return _parseMenuToRouter(item)
    }) : null;
    return {
        path: el.path,
        name: el.name,
        icon: el.icon,
        component: modules[componentUrl] || modules["../views/common/404.vue"],  //import("../views/"+el.componentUrl+".vue")
        meta: el,
        children: children,
    }
}

export const parseMenuToRouter = (menuList,router)=>{
    if (!menuList) {
        return router;
    }
    let routers  = menuList.map(el=>_parseMenuToRouter(el))
    router && routers.forEach(el=>{
        router.addRoute(el)
    })
    return routers
}

export const clearMenus = ()=>{

}

export const setRouter = ()=>{

}