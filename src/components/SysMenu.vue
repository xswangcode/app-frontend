<script setup>
import {ref} from 'vue'
import SysMenuItem from "@/components/components/SysMenuItem.vue";
import router from "@/router/index.js";

import {useMenuStore} from "@/stores/menu.js";
import {storeToRefs} from "pinia";

const menuStore = useMenuStore();
const {isCollapse} = storeToRefs(menuStore)

const DefineProp = defineProps(["menus"])
const clickHandle = (evt)=>{

}

</script>

<template>

  <div >
    <el-menu :router="true" :collapse="isCollapse" background-color="#545c64"  text-color="#fff"  style="min-height: 100%;">
          <SysMenuItem :menus="DefineProp.menus"  ></SysMenuItem>
    </el-menu>

  </div>
</template>

<style scoped>
aside> div{
  width: 100%;
  height: 100%;
}
</style>