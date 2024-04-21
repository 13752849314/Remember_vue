<template>
    <div class="user">
        <div class="search">
            <el-button type="primary" @click="addRef.drawer=true">添加</el-button>
        </div>
        <el-table :data="showUsers" style="width: 95%">
            <el-table-column prop="id" label="编号" sortable/>
            <el-table-column prop="username" label="用户名" :formatter="formatter"/>
            <el-table-column prop="phone" label="电话"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="birthday" label="生日"/>
            <el-table-column prop="roles" label="角色"/>
            <el-table-column prop="created_at" label="创建于" sortable/>
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
        <el-pagination small background layout="prev, pager, next" :total="users.length" style="margin-top: 6px"
                       v-model:current-page="pageIndex"/>
        <Drawer ref="addRef" @sync-list="getAllUsers"></Drawer>
        <Change ref="changeRef" @sync-list="getAllUsers"></Change>
    </div>
</template>

<script setup lang="ts">
import {computed, h, onMounted, ref} from 'vue'
import {$Delete, $GetUsers} from "../../api/user.ts"
import Drawer from "../../components/Drawer.vue"
import Change from "../../components/Change.vue"
import {ElMessageBox} from "element-plus";

let users = ref([])
let pageIndex = ref(1)
let getAllUsers = async () => {
    let users1 = $GetUsers()
    users1.then(data => {
        users.value = data.data.user
    })
}
let showUsers = computed(() => {
    return users.value.slice((pageIndex.value - 1) * 10, pageIndex.value * 10)
})
onMounted(() => {
    getAllUsers()
})

const handleEdit = (row: any) => {
    changeRef.value.dialogFormVisible = true
    changeRef.value.table = row
}

const handleDelete = (username: string) => {
    ElMessageBox.confirm(
        "确定删除吗?",
        "系统提示",
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        await $Delete(username)
        await getAllUsers()
    })
}
const formatter = (row, column, cellValue, index) => {
    if (row.deleted_at) {
        return h('span', {style: 'color: red'}, cellValue)
    }
    return h('span', {style: 'color: green'}, cellValue)
}

let addRef = ref(null)
let changeRef = ref(null)

</script>

<style scoped lang="scss">
.search {
  margin-bottom: 5px;
}
</style>