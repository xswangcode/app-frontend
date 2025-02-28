<script setup>
import {RouterView} from 'vue-router'
import {onBeforeUnmount, onMounted, ref} from 'vue'
import SysMenu from "@/components/SysMenu.vue";
import DefaultHeader from "@/components/Layout/default/DefaultHeader.vue";
import router from "@/router/index.js";
import {useAppStore} from "@/stores/app.js"
import {storeToRefs} from 'pinia'
import {useTabsStore} from "@/stores/tabs.js"


// 获取 store
const tabsStore = useTabsStore()
const appStore = useAppStore()
const {menus, login_status} = storeToRefs(appStore)
const is_login = ref(login_status)

// 定义右键菜单状态
const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0,
  targetTab: null
})
// 用于保存 pending 定时器的引用，避免重复显示
let menuTimeout = null
// 打开右键菜单，先关闭已有菜单
const openContextMenu = (event, tab) => {
  // 关闭之前的菜单
  closeContextMenu()

  // 如果存在 pending 定时器，先清除
  if (menuTimeout) {
    clearTimeout(menuTimeout)
    menuTimeout = null
  }
  // 延迟执行（可根据需要调整，或者直接立即显示）
  menuTimeout = setTimeout(() => {
    contextMenu.value = {
      visible: true,
      x: event.clientX,
      y: event.clientY,
      targetTab: tab
    }
    menuTimeout = null
  }, 0)
}

// 关闭右键菜单
const closeContextMenu = () => {
  contextMenu.value.visible = false
}

// 监听全局点击事件，点击其他地方关闭右键菜单
const onGlobalClick = (e) => {
  // 若点击的是右键菜单本身，则不关闭
  const menuEl = document.querySelector('.context-menu')
  if (menuEl && menuEl.contains(e.target)) return
  closeContextMenu()
}

// 注册全局点击监听
onMounted(() => {
  document.addEventListener('click', onGlobalClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onGlobalClick)
})

// 处理右键菜单命令，根据命令调用相应函数
const handleCommand = (command) => {
  const tabName = contextMenu.value.targetTab?.name
  if (!tabName) return
  switch (command) {
    case 'close':
      if (tabName !== '首页') {
        tabsStore.removeTab(tabName)
        if (tabsStore.currentTab === tabName && tabsStore.tabs.length > 0) {
          const newTab = tabsStore.tabs[tabsStore.tabs.length - 1]
          router.push(newTab.path)
        }
      }
      break
    case 'closeOthers':
      closeOtherTabs(tabName)
      break
    case 'closeLeft':
      closeLeftTabs(tabName)
      break
    case 'closeRight':
      closeRightTabs(tabName)
      break
    case 'closeAll':
      closeAllTabs()
      break
    case 'refresh':
      refreshTab(tabName)
      break
    default:
      break
  }
  // 执行完后关闭菜单
  closeContextMenu()
}

// 功能函数
const closeOtherTabs = (tabName) => {
  tabsStore.tabs = tabsStore.tabs.filter(tab => tab.name === '首页' || tab.name === tabName)
  tabsStore.setCurrentTab(tabName)
  const tab = tabsStore.tabs.find(tab => tab.name === tabName)
  if (tab) router.push(tab.path)
}

const closeLeftTabs = (tabName) => {
  const index = tabsStore.tabs.findIndex(tab => tab.name === tabName)
  if (index > -1) {
    tabsStore.tabs = tabsStore.tabs.filter((tab, idx) => idx >= index || tab.name === '首页')
    tabsStore.setCurrentTab(tabName)
    const tab = tabsStore.tabs.find(tab => tab.name === tabName)
    if (tab) router.push(tab.path)
  }
}

const closeRightTabs = (tabName) => {
  const index = tabsStore.tabs.findIndex(tab => tab.name === tabName)
  if (index > -1) {
    tabsStore.tabs = tabsStore.tabs.filter((tab, idx) => idx <= index || tab.name === '首页')
    tabsStore.setCurrentTab(tabName)
    const tab = tabsStore.tabs.find(tab => tab.name === tabName)
    if (tab) router.push(tab.path)
  }
}

const closeAllTabs = () => {
  const homepage = tabsStore.tabs.find(tab => tab.name === '首页')
  if (homepage) {
    tabsStore.setTabs([homepage])
    tabsStore.setCurrentTab(homepage.name)
    router.push(homepage.path)
  }
}

const refreshTab = (tabName) => {
  const tab = tabsStore.tabs.find(tab => tab.name === tabName)
  if (tab) {
    router.replace({path: tab.path, query: {t: Date.now()}})
  }
}

const layout = () => {
  appStore.resetState()
  router.push("/login");
}

// 已有的 tab 切换与关闭事件
const handleTabChange = (name) => {
  tabsStore.setCurrentTab(name);  // 更新当前 tab
  const tab = tabsStore.tabs.find(tab => tab.name === name);
  if (tab) {
    router.push(tab.path);  // 跳转到对应路径
  }
}

const handleTabRemove = (name) => {
  tabsStore.removeTab(name);
  if (tabsStore.currentTab === name && tabsStore.tabs.length > 0) {
    const newTab = tabsStore.tabs[tabsStore.tabs.length - 1];
    router.push(newTab.path);
  }
}
</script>

<template>
  <div v-if="is_login">
    <el-container>
      <el-aside width="auto">
        <el-scrollbar height="100vh">
          <SysMenu :menus="menus" style="height: 100vh;"/>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header style=" height:55px;padding: 0">
          <DefaultHeader/>
        </el-header>
        <el-main>
          <div style="display: flex; width: 100%; height: 100%; ">
            <el-tabs v-model="tabsStore.currentTab"
                     class="eltabs"
                     type="card"
                     @tab-change="handleTabChange"
                     @tab-remove="handleTabRemove">
              <el-tab-pane
                  v-for="it in tabsStore.tabs"
                  :key="it.name"
                  :label="it.title"
                  :name="it.name">
                <template #label>
                    <span class="custom-tabs-label" @contextmenu.prevent="openContextMenu($event, it)">
                      <span>{{ it.name }}</span>
                    </span>
                </template>
                <div class="main_content">
                  <el-scrollbar height="86vh">
                    <!-- 显示 tab 对应内容 -->
                    <router-view v-slot="{ Component }">
                      <keep-alive>
                        <component :is="Component" :key="$route.fullPath"/>
                      </keep-alive>
                    </router-view>
                  </el-scrollbar>
                </div>
              </el-tab-pane>
            </el-tabs>
            <!-- 自定义右键菜单 -->
            <ul
                v-if="contextMenu.visible"
                :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
                class="context-menu"
            >
              <li @click="handleCommand('close')">关闭当前</li>
              <li @click="handleCommand('closeOthers')">关闭其他</li>
              <li @click="handleCommand('closeLeft')">关闭左侧</li>
              <li @click="handleCommand('closeRight')">关闭右侧</li>
              <li @click="handleCommand('closeAll')">关闭所有</li>
              <li @click="handleCommand('refresh')">刷新</li>
            </ul>
          </div>
        </el-main>
        <el-footer>
          <div style="text-align: center; margin-top: 20px">
            XXXXXXXXXXXXX powered BY xxxs
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
  <div v-else>
    <el-container>
      <el-main style="border: 1px solid #f7f7f7; height: 100vh">
        <RouterView/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.el-main {
  padding: 0;
}

.el-aside {
  transition: width 0.3s ease;
}

.eltabs {
  width: 100%;
  min-height: 55px;
}

.el-tabs {
  --el-tabs-header-height: 58px !important;
}

.custom-tabs-label {
  cursor: pointer;
  font-size: 18px;

}

.el-tabs {
  --el-tabs-header-height: 43px;
}

/* 右键菜单样式 */
.context-menu {
  position: absolute;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  font-size: 12px;
}

.context-menu li {
  padding: 4px 12px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f2f2f2;
}

.main_content {
  border: 1px springgreen solid;
}


</style>
