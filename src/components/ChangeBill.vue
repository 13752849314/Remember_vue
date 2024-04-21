<template>
    <el-dialog v-model="dialogFormVisible" title="修改信息" width="300">
        <el-form :model="table">
            <el-form-item label="消费类型" prop="consumeType">
                <el-select v-model="table.consumeType">
                    <el-option v-for="k of Object.keys(mapping)" :label="mapping[k]" :value='k' :key='k'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="消费金额" prop="consumeMoney">
                <el-input v-model="table.consumeMoney" type="number"/>
            </el-form-item>
            <el-form-item label="消费时间" prop="consumeTime">
                <el-date-picker
                        v-model="table.consumeTime"
                        type="datetime"
                        placeholder="请选择日期"
                        format="YYYY-MM-DD hh:mm:ss"
                        value-format="YYYY-MM-DD hh:mm:ss"
                        :default-value="table.consumeTime"
                />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="table.remark"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="changeInfo">
                    修改
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {ConsumeTypeMapping} from "../utils/common.ts"
import {$changeBill} from "../api/bill.ts"

const mapping = ConsumeTypeMapping
const emit = defineEmits(['sync-list'])
let table = ref({})
let dialogFormVisible = ref(false)

const changeInfo = async () => {
    await $changeBill(table.value, table.value.id)
    emit('sync-list')
    dialogFormVisible.value = false
}
defineExpose({
    dialogFormVisible,
    table
})
</script>

<style scoped lang="scss">

</style>