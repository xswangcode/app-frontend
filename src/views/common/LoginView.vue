<script setup>
import {getCurrentInstance, ref} from 'vue'
import API from "@/api/api.js";
import {parseMenuToRouter} from "@/utils/MenuUtils.js";
import {useAppStore} from "@/stores/app.js"
import {useRouter} from 'vue-router'
import {ElMessage} from "element-plus";

const appStore = useAppStore()

const _this = getCurrentInstance()

// // 页面先加载是否有token, token直接登录
const router = useRouter()
//
// if (appStore.login_status) {
//   debugger
//   router.go("/home")
// }

const userLoginData = ref({
  username: "xs",
  password: "xs",
})


const login = () => {
  API.login_group.login(userLoginData.value).then(res => {
    if (res.success) {
      // 加载权限菜单
      // 清空
      router.options.routes = []

      // 获取菜单
      API.menu_group.getMenu().then(res => {
        parseMenuToRouter(res.result, router)

        appStore.setData("menus", res.result)
        appStore.setLogin(true)
        appStore.setData("routers", router.getRoutes())
        router.push("/home")
        ElMessage.success("登录成功")
      })

    }
  })
}


</script>

<template>
  <div class="login-container">
    <el-form>
      <el-form-item label="账户">
        <el-input v-model="userLoginData.username" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userLoginData.password" type="text"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="login-btn" plain type="primary" @click="login">登录</el-button>
  </div>

</template>


<style scoped>
.login-container {
  margin-top: 20%;
  margin-left: 40%;
  width: 360px;
  height: 200px;
  border: #e3e3e3 1px solid;
  border-radius: 20px 20px 20px 0;
  padding: 20px;
}

.login-btn {
  background-color: #66ccff;
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
