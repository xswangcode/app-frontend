import './assets/main.css'

import {createApp,createVNode } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons'
import * as Icons from "@element-plus/icons-vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'




const pinia = createPinia()
pinia.use(piniaPluginPersist)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)

// 全局注册
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key]);
});


app.mount('#app')


