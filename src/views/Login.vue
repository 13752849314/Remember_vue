<template>
    <div class="login">
        <div class="box">
            <h2>Bill 管理系统</h2>
            <el-form
                    ref="formRef"
                    size="default"
                    :model="formData"
                    status-icon
                    :rules="rules"
                    label-width="40px"
            >
                <el-form-item label="账号" prop="username">
                    <el-input v-model="formData.username"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" type="password" show-password/>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">
                        登录
                    </el-button>
                    <el-button @click="resetForm(formRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {$GetInfo, $Login} from "../api/user.ts";
import router from "../router";
import useUser from '../store/user.ts'

const formRef = ref<FormInstance>()
const formData = reactive({
    username: '',
    password: ''
})
const userStore = useUser()


const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        callback()
    }
}


const rules = reactive<FormRules<typeof formData>>({
    username: [{validator: validateUsername, trigger: 'blur'}],
    password: [{validator: validatePassword, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            let ret = await $Login(formData)
            if (ret) {
                let user = await $GetInfo()
                userStore.setUser(user.data.info)
                router.push('/index')
            }
        } else {
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

onMounted(() => {
    if (userStore.user.roles) {
        router.push('/index')
    }
})
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #fbda41, #d3f177);
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    width: 400px;
    border: 2px solid #ffff;
    padding: 20px;

    h2 {
      color: #301dde;
      font-size: 20px;
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>