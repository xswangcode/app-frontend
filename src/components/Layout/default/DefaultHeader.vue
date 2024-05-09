<script setup>
import {useMenuStore} from "@/stores/menu.js";
import {useAppStore} from "@/stores/app.js";
import router  from "@/router/index.js";


const menuStore = useMenuStore();
console.log(menuStore.isCollapse);

const appStore = useAppStore();

const changeCollapse = () => {
  menuStore.changeCollapse()
  console.log(menuStore.isCollapse);
}

const logout_system = ()=>{
  appStore.resetState()
  localStorage.clear()
  router.push('/login')
}



</script>

<template>
  <div >
    <el-row class="header_container">
      <el-col :span="12">
        <el-row class="height_100">
          <el-col :span="1" :xl="1" :xs="6"  :sm="2" :lg="2">
            <div class="header_item" style="font-size: 40px;color: #fff">
              <!-- 伸缩条 -->
              <el-icon @click="changeCollapse">
                <Expand v-if="menuStore.isCollapse"/>
                <Fold v-else/>
              </el-icon>
            </div>
          </el-col>

          <el-col :span="20" :push="1" :xl="20" :xs="14"  :sm="18" :lg="18" >
            <div class="header_item web_title">
                  <span>
                  欢迎 - 布局自适应宽度布局自适应宽度布局
                  </span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="21" :xs="14" :md="18" :sm="18" :lg="18">
            <div class="header_item">
              <!-- 消息提示占位 -->
            </div>
          </el-col>
          <el-col :span="3" :xs="10" :md="6" :sm="6" :lg="6">
            <!-- 退出登录 -->
            <el-dropdown style="float: right">
              <div class="header_item">
                <el-row class="height_100 width_100">
                  <!-- 用户信息 -->
                  <el-col :span="8" :xl="8" :xs="7"  :sm="7" :lg="6" >
                    <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </el-col>
                  <el-col :span="16" :push="1" :xl="16" :xs="17"  :sm="17" :lg="18" >
                    <div class="name_span header_item">
                      <el-text type="danger" > YOM-yarn</el-text>
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
  padding: 5px  5px;

}

.height_100{
    height: 100%;
}
.width_100{
  width: 100%;
}
.header_item {
  display: flex;
  align-items: center;
  height: 100%;
}
.name_span{
  padding: 7px;
}

.web_title {
  font-size: 16px;
  color: #fff;
  font-weight: 700 !important;
}
:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}

</style>