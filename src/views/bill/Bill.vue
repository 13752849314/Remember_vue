<template>
    <div class="bill">
        <div class="search">
            <el-button type="primary" @click="addBill.drawer=true">添加</el-button>
        </div>
        <el-table :data="showBills" style="width: 95%">
            <el-table-column prop="id" label="ID"/>
            <el-table-column prop="consumeTime" label="消费时间"/>
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="consumeType" label="消费类型" :formatter="formatter"/>
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
                            @click="handleDelete(scope.row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination small background layout="prev, pager, next" :total="bills.length" style="margin-top: 6px"
                       v-model:current-page="pageIndex"/>
        <AddBill ref="addBill" @sync-list="getBill"></AddBill>
        <ChangeBill ref="changeBill" @sync-list="getBill"></ChangeBill>
    </div>
</template>

<script setup lang="ts">
import {computed, h, onMounted, ref} from "vue"
import {$deleteById, $getBillByUsername} from "../../api/bill.ts"
import {ConsumeTypeMapping} from "../../utils/common.ts"

import AddBill from "../../components/AddBill.vue"
import {ElMessageBox} from "element-plus";
import ChangeBill from "../../components/ChangeBill.vue";

let bills = ref([])
let pageIndex = ref(1)
let getBill = () => {
    let ret = $getBillByUsername()
    ret.then(data => {
        bills.value = data.data.bills
    })
}
let showBills = computed(() => {
    return bills.value.slice((pageIndex.value - 1) * 10, pageIndex.value * 10)
})
const handleEdit = (row: any) => {
    changeBill.value.dialogFormVisible = true
    changeBill.value.table = row
}

const handleDelete = (id: string) => {
    ElMessageBox.confirm(
        "确定删除吗?",
        "系统提示",
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        await $deleteById(id)
        await getBill()
    })
}
const formatter = (row, column, cellValue, index) => {
    let value = ConsumeTypeMapping[cellValue]
    return h('span', {style: 'color: green'}, value)
}

let addBill = ref(null)
let changeBill = ref(null)
onMounted(() => {
    getBill()
})
</script>

<style scoped lang="scss">

</style>