
<script setup>
import SysMenuItem from "@/components/components/SysMenuItem.vue";

import {storeToRefs} from "pinia";
import {useAppStore} from "@/stores/app.js";

const appStore = useAppStore();
const {isCollapse} = storeToRefs(appStore);

const DefineProp = defineProps(["menus"]);
const clickHandle = (evt) => {
  // 你可以根据需要处理点击事件
}
</script>

<template>
  <div>
    <!-- 动态调整菜单宽度 -->
    <el-menu :collapse="isCollapse" :router="true" class="menu_content" @select="clickHandle">
      <SysMenuItem :menus="DefineProp.menus"/>
    </el-menu>
  </div>
</template>

<style scoped>
.menu_content {
  /* 基础菜单样式 */
  background: var(--themes-background-color);
  height: 100%;
}

</style>
