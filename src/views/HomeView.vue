<script setup>
import {getCurrentInstance, ref} from 'vue'
import API from "@/api/api.js";
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
// import {router_404} from "@/router/index.js";
import {useAppStore} from "@/stores/app.js"

const appStore = useAppStore()

const _this = getCurrentInstance()

const router = useRouter()



const test = () => {
  API.login_group.test().then(res => {
    ElMessage.warning(res.message)
  })
}
const celarCookie = () => {
  document.cookie = "X-Auth-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

const push_test = () => {
  router.push("/123123123131");
}
const ins = ref({
  a:"",
  b:''
})

</script>

<template>
  <main>
    首页
    <el-button @click="test">test</el-button>
    <el-button @click="push_test">push(12312312312)</el-button>
    <el-button @click="celarCookie">celarCookie</el-button>
    <el-input v-model="ins.a"></el-input>
    <el-input v-model="ins.b"></el-input>
  </main>
</template>
