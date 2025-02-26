import './assets/main.css';

import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 按需导入 Element Plus 图标
import * as Icons from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';

// 创建 Pinia 并使用插件
const pinia = createPinia();
pinia.use(piniaPluginPersist);

// 创建 Vue 应用
const app = createApp(App);

// 使用插件
app.use(router);
app.use(pinia);
app.use(ElementPlus);

// 全局注册 Element Plus 图标
Object.entries(Icons).forEach(([name, icon]) => {
    app.component(name, icon);
});

// 挂载应用
app.mount('#app');
