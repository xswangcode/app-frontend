<script setup xmlns:el-col="http://www.w3.org/1999/html">
import {RouterView} from 'vue-router'
import {getCurrentInstance, ref, watch} from 'vue'
import SysMenu from "@/components/SysMenu.vue";
import DefaultHeader from "@/components/Layout/default/DefaultHeader.vue";
import router from "@/router/index.js";

import {useAppStore} from "@/stores/app.js"
import {storeToRefs} from 'pinia'

import {useTabsStore} from "@/stores/tabs.js"

const tabsStore = useTabsStore()
const appStore = useAppStore()
const {menus, login_status} = storeToRefs(appStore)


const _this = getCurrentInstance()

const is_login = ref(login_status)
watch(login_status, (newVal, oldVal) => {

})
const layout = () => {
  appStore.resetState()
  router.push("/login");
}

const handleTabRemove = (name) => {
  tabsStore.removeTab(name)
}

const container_main_config = ref({
  style: "width:calc(90vw)"
})
const menu_config = ref({
  width: "260px"
})
const editableTabs = ref([
  {
    title: 'home',
    name: 'home',
  },
  {
    title: 'dashboard',
    name: 'dashboard',
  },
])

</script>

<template>
  <div v-if="is_login">
    <el-container>
      <el-aside width="auto">
        <SysMenu :menus="menus" style="height: 100vh;"></SysMenu>
      </el-aside>
      <el-container>
        <!--      style="max-width: 90vw;min-width: 80vw;"-->
        <el-header style="border: 1px solid red;background-color: #00abff;width: 100%;padding: 0">
          <DefaultHeader></DefaultHeader>

        </el-header>
        <el-main style="border: 1px solid red;">
          <!--          不要面包屑要tabs-->
          <div style="display: flex;width: 100%;height: 100%">
            <el-tabs v-model="tabsStore.currentTab" :closable="true" class="eltabs"
                     type="border-card"
                     @tab-remove="handleTabRemove">
              <el-tab-pane
                  v-for="it in tabsStore.tabs"
                  :key="it.name"
                  :label="it.title"
                  :name="it.name"
              >
                <template #label>
                  <span class="custom-tabs-label">
                    <span>{{ it.name }}</span>
                  </span>
                </template>
              </el-tab-pane>
              <RouterView/>
            </el-tabs>
<!--            <div class="tab_content" style="border: 1px springgreen solid;width: 100%;height: 100%;">-->


            <!--            </div>-->
          </div>
          <!--            <el-col :span="24" style="align-items: flex-end;justify-content: left;display: flex;">-->
          <!--              <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px;">-->
          <!--                <el-breadcrumb-item> promotion list </el-breadcrumb-item>-->
          <!--                <el-breadcrumb-item> promotion detail </el-breadcrumb-item>-->
          <!--              </el-breadcrumb>-->
          <!--            </el-col>-->

        </el-main>
        <el-footer style="border: 1px solid red;">
          <div style="text-align: center;margin-top: 20px">
            XXXXXXXXXXXXX powered BY xxxs
          </div>

        </el-footer>
      </el-container>
    </el-container>
  </div>
  <div v-else>
    <el-container>
      <el-main style="border: 1px springgreen solid;height: 100vh">
        <RouterView style="border: 1px solid #e3e3e3;"/>
      </el-main>
    </el-container>
  </div>
</template>


<style scoped>


.el-container {
  weight: 100%;
  height: 100%;
}

.el-main {
  padding: 0;
}

.eltabs {
  width: 100%;
}

.eltabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.eltabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.eltabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

</style>