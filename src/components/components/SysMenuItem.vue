<script setup>
import SysMenuItem from "@/components/components/SysMenuItem.vue";

const DefineProp = defineProps(["menus", "isCollapse"])
</script>

<template>
  <template v-for="item in DefineProp.menus">

    <!-- 有children -->
    <el-sub-menu v-if="item.children && item.children.length > 0 " v-show="item.visible" :index="item.path"
                 class="menu_content">
      <template #title>
        <el-icon>
          <component :is="item.icon"/>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <SysMenuItem :menus="item.children"></SysMenuItem>
    </el-sub-menu>
    <!-- 没有子项 -->
    <el-menu-item v-else v-show="item.visible" :index="item.path" class="menu_content">
      <el-icon>
        <component :is="item.icon"/>
      </el-icon>
      <template #title>
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>
    <div style="min-width: 260px;"></div>
  </template>
</template>

<style scoped>
.menu_content {
  background: var(--themes-background-color);
  border-bottom: 1px solid var(--themes-border-color);
}
</style>