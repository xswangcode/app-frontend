<script setup xmlns:el-col="http://www.w3.org/1999/html">
import {RouterLink, RouterView, useRouter} from 'vue-router'
import {ref, getCurrentInstance, watch} from 'vue'
import SysMenu from "@/components/SysMenu.vue";
import DefaultHeader from "@/components/Layout/default/DefaultHeader.vue";
import router from "@/router/index.js";
import {getVal, setVal} from "@/utils/StoreUtil.js";

import {useAppStore} from "@/stores/app.js"
import {useMenuStore} from "@/stores/menu.js"
import {storeToRefs} from 'pinia'

const appStore = useAppStore()
const {menus, login_status} = storeToRefs(appStore)



const _this = getCurrentInstance()



watch(login_status, (newVal, oldVal) => {
  if (newVal) {
    console.log("LOG--登录成功")
  } else {
    console.log("LOG--退出成功")
  }
})
const layout = () => {
  appStore.resetState()
  router.push("/login");
}
const updateData = (key, val) => {
}

const container_main_config = ref({
  style: "width:calc(90vw)"
})
const menu_config = ref({
  width: "260px"
})


</script>

<template>
  <div v-if="login_status">
    <el-container>
      <el-aside width="auto">
        <SysMenu :menus="menus"  style="height: 100vh;"></SysMenu>
      </el-aside>
      <el-container>
        <!--      style="max-width: 90vw;min-width: 80vw;"-->
        <el-header style="border: 1px solid red;background-color: #00abff;width: 100%;padding: 0">
          <DefaultHeader></DefaultHeader>
          <!--          <el-row>-->
          <!--            <el-col :span="4">-->
          <!--              <span @click="handleChangeCollapse">切换</span>-->
          <!--              <div style="text-align: left;margin-top: 12px;color: #393f42;font-size: 20px;font-weight: bold;">-->
          <!--                xxxxxx 系统-->
          <!--              </div>-->
          <!--            </el-col>-->
          <!--            <el-col :span="16">-->
          <!--            </el-col>-->
          <!--            <el-col :span="4" style="height: 100%;display: flex;align-items: center;justify-content: center;">-->
          <!--              &lt;!&ndash;头像 用户名称&ndash;&gt;-->
          <!--              <el-dropdown style="height: 6vh;margin: 8px 0">-->
          <!--                <div style="height: 100%;display: flex;align-items: center;justify-content: center;">-->
          <!--                  <el-image style="width: 28px; height: 28px"-->
          <!--                            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"-->
          <!--                            />-->
          <!--                  <el-text type="primary" style="font-size: 13px;padding-left: 4px"> 演示用户</el-text>-->
          <!--                </div>-->
          <!--                <template #dropdown>-->
          <!--                  <el-dropdown-menu>-->
          <!--                    <el-dropdown-item icon="Document">个人信息</el-dropdown-item>-->
          <!--                    <el-dropdown-item icon="SwitchButton" @click="layout">退出系统</el-dropdown-item>-->
          <!--                  </el-dropdown-menu>-->
          <!--                </template>-->
          <!--              </el-dropdown>-->
          <!--            </el-col>-->
          <!--          </el-row>-->

        </el-header>
        <el-main style="border: 1px solid red;">
          <RouterView @update="updateData"/>
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
        <RouterView @update="updateData" style="border: 1px solid #e3e3e3;"/>
      </el-main>
    </el-container>
  </div>
</template>


<style scoped>


.el-container {
  weight: 100%;
  height: 100%;
}


</style>