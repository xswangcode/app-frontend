<script setup>
import {useMenuStore} from "@/stores/menu.js";
import {useAppStore} from "@/stores/app.js";
import {useTabsStore} from "@/stores/tabs.js";
import router from "@/router/index.js";


const menuStore = useMenuStore();

const appStore = useAppStore();
const tabStore = useTabsStore()

const changeCollapse = () => {
  menuStore.changeCollapse()
}

const logout_system = () => {
  router.push('/login')
  setTimeout(() => {
    appStore.resetState()
    localStorage.clear()
    tabStore.reset()
  }, 1)
}


</script>

<template>
  <div>
    <el-row class="header_container">
      <el-col :span="20">
        <el-row class="height_100">
          <el-col :lg="2" :sm="2" :span="1" :xl="1" :xs="6">
            <div class="header_item" style="font-size: 40px;color: #fff">
              <!-- 伸缩条 -->
              <el-icon @click="changeCollapse">
                <Expand v-if="menuStore.isCollapse"/>
                <Fold v-else/>
              </el-icon>
            </div>
          </el-col>

          <el-col :lg="18" :push="1" :sm="18" :span="20" :xl="20" :xs="14">
            <div class="header_item web_title">
                  <span>
                  欢迎 - 布局自适应宽度布局自适应宽度布局
                  </span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col :lg="14" :md="8" :sm="10" :span="18" :xs="6">
            <div class="header_item">
              <!-- 消息提示占位 -->
            </div>
          </el-col>
          <el-col :lg="10" :md="16" :sm="14" :span="6" :xs="18">
            <!-- 退出登录 -->
            <el-dropdown style="float: right">
              <div class="header_item">
                <el-row class="height_100 width_100">
                  <!-- 用户信息 -->
                  <el-col :lg="6" :sm="7" :span="8" :xl="8" :xs="7">
                    <el-avatar :size="45"
                               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </el-col>
                  <el-col :lg="18" :push="1" :sm="17" :span="16" :xl="16" :xs="17">
                    <div class="name_span header_item">
                      <el-text type="danger"> YOM-yarn</el-text>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click="logout_system">退出系统</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>


.header_container {
  padding: 5px 5px;
  height: 55px;
  background: var(--themes-background-color);
}

.height_100 {
  height: 100%;
}

.width_100 {
  width: 100%;
}

.header_item {
  display: flex;
  align-items: center;
  height: 55px;
  //justify-content: center;
}

.name_span {
  padding: 7px;
}

.web_title {
  font-size: 20px;
  color: rgb(48, 49, 51);
  font-weight: 700 !important;
  line-height: 57px;
  height: 57px;
  //width: 200px; /* 设置容器宽度 */
  overflow: hidden; /* 隐藏超出部分 */
  display: -webkit-box; /* 设置为弹性盒子模型 */
  -webkit-line-clamp: 1; /* 显示的行数 */
  -webkit-box-orient: vertical; /* 垂直排列子元素 */

}

:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}

</style>