export const setVal = (key, value) => {
    localStorage.setItem(key, value)
}
export const getVal = (key) => {
    return localStorage.getItem(key)
}

export const getToken = () => {
    return getVal("token")
}

export const setToken = (token) => {
    setVal("token", token)
}



const MENU_CACHE_KEY = "MENUS"
// export const menuStore = {
//     setMenu: (menus)=>{
//         setVal(MENU_CACHE_KEY,JSON.stringify(menus))
//     },
//     getMenu: ()=>{
//         return JSON.parse(getVal(MENU_CACHE_KEY))
//     }
// }