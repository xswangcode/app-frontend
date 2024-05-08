<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRouter();

const params =  route.currentRoute.params;
const query =  route.currentRoute.query;
console.log(params);
console.log(query);

// from
// const from =
// to
// const to =  route.query.to;


</script>

<template>
  <div style="border: 1px #fff200 solid;height: 100%">
    <h1>404 page</h1>
    <h2>from :{{ }}</h2>
    <h2>to   :{{ }}</h2>
  </div>
</template>

<style scoped>

</style>