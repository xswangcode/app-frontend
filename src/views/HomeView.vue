<script setup>
import {ref, getCurrentInstance} from 'vue'
import API from "@/api/api.js";
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
// import {router_404} from "@/router/index.js";
import {getVal, setToken,getToken, setVal} from "@/utils/StoreUtil.js";
import {useAppStore}  from "@/stores/app.js"

const appStore = useAppStore()

const _this = getCurrentInstance()

const router = useRouter()
let token = getToken();


if (!token) {
  ElMessage.error("身份信息丢失,请重新登录")
  router.push("/login");
}

const test = () => {
  API.login_group.test().then(res => {
    console.log("test", res)
    ElMessage.error("12312")
  })
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
    <el-input v-model="ins.a"></el-input>
    <el-input v-model="ins.b"></el-input>
  </main>
</template>
