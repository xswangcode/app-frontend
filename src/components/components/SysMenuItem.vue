<script setup>
import SysMenuItem from "@/components/components/SysMenuItem.vue";

const DefineProp = defineProps(["menus", "isCollapse"])
</script>

<template>

  <template v-for="item in DefineProp.menus">
    <!-- 有children -->
    <el-sub-menu v-if="item.children && item.children.length > 0 " :index="item.path" v-show="item.visible">
      <template #title>
        <el-icon>
          <component :is="item.icon"/>
        </el-icon>
        <span >{{ item.name }}</span>
      </template>
        <SysMenuItem :menus="item.children" ></SysMenuItem>
    </el-sub-menu>
    <!-- 没有子项 -->
    <el-menu-item v-else :index="item.path" v-show="item.visible">
        <el-icon>
          <component :is="item.icon"/>
        </el-icon>
      <template #title>
        <span >{{ item.name }}</span>
      </template>
    </el-menu-item>

  </template>
</template>

<style scoped>

</style>