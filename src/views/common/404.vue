<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref,onBeforeUnmount} from "vue";
import {use404Store} from "@/stores/404.js";
import {storeToRefs} from "pinia";
const store404 = use404Store()

const {from,to,msg } = storeToRefs(store404)
onBeforeUnmount(()=>{
  store404.reset()
})
// from
// const from =
// to
// const to =  route.query.to;


</script>

<template>
  <div style="border: 1px #fff200 solid;height: 100%">
    <h1>404 page</h1>
    <h2>from :  {{ from }}</h2>
    <h2>to   :  {{ to }}</h2>
    <h2>msg  :  {{ msg }}</h2>
  </div>
</template>

<style scoped>

</style>