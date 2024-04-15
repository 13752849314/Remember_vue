<template>
    <div class="index">
        <div class="left">
            <h2>Bill 管理系统</h2>
            <el-menu
                    router
                    active-text-color="#bb9505"
                    background-color="#fbda41">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <User/>
                        </el-icon>
                        <span>账户管理</span>
                    </template>
                    <el-menu-item index="/role">角色管理</el-menu-item>
                    <el-menu-item index="/user">用户管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Notebook/>
                        </el-icon>
                        <span>账单管理</span>
                    </template>
                    <el-menu-item index="/bill">我的账单</el-menu-item>
                    <el-menu-item>？？？</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Files/>
                        </el-icon>
                        <span>文件管理</span>
                    </template>
                    <el-menu-item index="/file">我的文件</el-menu-item>
                    <el-menu-item>？？？</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="right">
            <div class="top">
                <el-menu
                        router
                        :ellipsis="false"
                        mode="horizontal"
                        background-color="#bb9505"
                        active-text-color="#fbda41"
                >
                    <el-menu-item index="/index">
                        <el-icon>
                            <HomeFilled/>
                        </el-icon>
                        首页
                    </el-menu-item>
                    <el-menu-item index="/email">
                        <el-icon>
                            <Message/>
                        </el-icon>
                        邮件
                    </el-menu-item>
                    <el-menu-item index="/message">
                        <el-icon>
                            <ChatDotSquare/>
                        </el-icon>
                        消息
                    </el-menu-item>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                                <UserFilled/>
                            </el-icon>
                            {{ userStore.user.username}}
                        </template>
                        <el-menu-item index="/center">个人中心</el-menu-item>
                        <el-menu-item index="/changepwd">修改密码</el-menu-item>
                        <el-menu-item @click="exit">退出登录</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {ChatDotSquare, Files, HomeFilled, Message, Notebook, User, UserFilled} from '@element-plus/icons-vue'
import {ElMessageBox} from 'element-plus'
import useUser from '../store/user.ts'
import router from "../router";
import {$Logout} from "../api/user.ts";

let userStore = useUser()
onMounted(() => {
    if (!userStore.user.roles) {
        router.push('/')
    }
})

let exit = () => {
    ElMessageBox.confirm(
        '是否退出登录?',
        '系统提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            // 清除服务器端缓存
            let ret = $Logout()
            ret.then(data => {
                if (data.code === "200") {
                    // 清除本地缓存
                    localStorage.clear()
                    userStore.clearUser()
                    // 跳转到登录页面
                    router.push('/')
                }
            })
        })
        .catch(() => {
        })
}
</script>

<style scoped lang="scss">
.index {
  width: 100vw;
  height: 100vh;
  display: flex;

  .left {
    width: 200px;
    background-color: #fbda41;
    //color: white;
    h2 {
      font-size: 18px;
      text-align: center;
      height: 60px;
      line-height: 60px;
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;

    .top {
      height: 60px;
      background-color: #bb9505;
      display: flex;
      justify-content: flex-end;
    }

    .content {
      flex: 1;
      padding: 5px;
    }
  }
}
</style>