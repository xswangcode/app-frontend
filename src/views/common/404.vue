<script setup>
import {onBeforeUnmount} from "vue";
import {use404Store} from "@/stores/404.js";
import router from "@/router/index.js";
import {useTabsStore} from "@/stores/tabs.js";
import {storeToRefs} from "pinia";

const store404 = use404Store()
const tabsStore = useTabsStore()

const {from,to,msg } = storeToRefs(store404)
onBeforeUnmount(()=>{
  store404.reset()
})

const back_page = () => {
  store404.reset()

  tabsStore.removeTab(router.currentRoute.value.path)
  router.back()
}

</script>

<template>
  <div>
    <h1>404 page</h1>
    <h2>from :  {{ from }}</h2>
    <h2>to   :  {{ to }}</h2>
    <h2>msg  :  {{ msg }}</h2>

    <el-button @click="back_page"> 返回上页</el-button>
  </div>
</template>

<style scoped>

</style>