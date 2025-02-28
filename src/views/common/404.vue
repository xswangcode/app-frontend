<script setup>
import {onBeforeUnmount} from "vue";
import {use404Store} from "@/stores/404.js";
import {storeToRefs} from "pinia";

const store404 = use404Store()

const {from,to,msg } = storeToRefs(store404)
onBeforeUnmount(()=>{
  store404.reset()
})


</script>

<template>
  <div>
    <h1>404 page</h1>
    <h2>from :  {{ from }}</h2>
    <h2>to   :  {{ to }}</h2>
    <h2>msg  :  {{ msg }}</h2>
  </div>
</template>

<style scoped>

</style>