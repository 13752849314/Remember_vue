<template>
    <div class="mine">
        <el-descriptions title="用户信息" border :column="2" size="large">
            <template #extra>
                <el-button type="primary">修改信息</el-button>
            </template>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <User/>
                        </el-icon>
                        用户名
                    </div>
                </template>
                {{ userStore.getUser().username }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Iphone/>
                        </el-icon>
                        电话
                    </div>
                </template>
                {{ userStore.getUser().phone }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Message/>
                        </el-icon>
                        邮箱
                    </div>
                </template>
                {{ userStore.getUser().email }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <Avatar/>
                        </el-icon>
                        角色
                    </div>
                </template>
                {{ userStore.getUser().roles }}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup lang="ts">
import {Avatar, Iphone, Message, User} from "@element-plus/icons-vue";
import useUser from '../../store/user.ts'

let userStore = useUser()

</script>

<style scoped lang="scss">

</style>