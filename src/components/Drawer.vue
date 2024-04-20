<template>
    <div>
        <el-drawer
                v-model="drawer"
                title="添加用户"
                direction="rtl"
                :before-close="closeDrawer">
            <el-form :model="user"
                     ref="formRef"
                     label-width="auto"
                     label-position="right"
                     :rules="rules"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="user.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="user.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roles">
                    <el-select v-model="user.roles">
                        <el-option label="普通用户" value="user"></el-option>
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="超级管理员" value="admins"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker
                            v-model="user.birthday"
                            type="date"
                            placeholder="请选择日期"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">添加</el-button>
                    <el-button @click="resetForm(formRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue"
import type {FormInstance, FormRules} from 'element-plus'
import {$AddUser} from "../api/user.ts"

const emit = defineEmits(['sync-list'])

const drawer = ref(false)
const closeDrawer = () => {
    drawer.value = false
}
const formRef = ref<FormInstance>()
const user = ref({
    username: '',
    password: '',
    phone: '',
    email: '',
    birthday: '',
    roles: ''
})
const rules = reactive<FormRules<typeof user>>({
    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
    password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
    phone: [{required: true, message: '电话不能为空', trigger: 'blur'}],
    email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
    birthday: [{required: true, message: '生日不能为空', trigger: 'blur'}],
    roles: [{required: true, message: '请选择角色', trigger: 'blur'}],
})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            await $AddUser(user.value)
            emit('sync-list')
        } else {
            return false
        }
    })
}
defineExpose({
    drawer
})

</script>

<style scoped lang="scss">

</style>