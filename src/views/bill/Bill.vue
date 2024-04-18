<template>
    <div class="bill">
        <el-table :data="bills" style="width: 95%">
            <el-table-column prop="id" label="ID"/>
            <el-table-column prop="consumeTime" label="消费时间"/>
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="consumeType" label="消费类型"/>
            <el-table-column prop="consumeMoney" label="消费金额"/>
            <el-table-column prop="remark" label="备注"/>
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
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {$getBillByUsername} from "../../api/bill.ts";

let bills = ref([])
let getBill = () => {
    let ret = $getBillByUsername()
    ret.then(data => {
        bills.value = data.data.bills
    })
}
const handleEdit = (row: any) => {
    console.log(row)
}

const handleDelete = (username: string) => {
    console.log(username)
}

onMounted(() => {
    getBill()
})
</script>

<style scoped lang="scss">

</style>