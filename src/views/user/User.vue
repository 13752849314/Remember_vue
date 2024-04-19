<template>
    <div class="user">
        <div class="search">
            <el-button type="primary" @click="addRef.drawer=true">添加</el-button>
        </div>
        <el-table :data="users" style="width: 95%">
            <el-table-column prop="id" label="编号"/>
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="phone" label="电话"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="birthday" label="生日"/>
            <el-table-column prop="roles" label="角色"/>
            <el-table-column prop="created_at" label="创建于"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row.username)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Drawer ref="addRef"></Drawer>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {$GetUsers} from "../../api/user.ts"
import Drawer from "../../components/Drawer.vue"

let users = ref([])
let getAllUsers = () => {
    let users1 = $GetUsers()
    users1.then(data => {
        users.value = data.data.user
    })
}
onMounted(() => {
    getAllUsers()
})

const handleEdit = (row: any) => {
    console.log(row)
}

const handleDelete = (username: string) => {
    console.log(username)
}

let addRef = ref(null)

</script>

<style scoped lang="scss">
.search {
    margin-bottom: 5px;
}
</style>