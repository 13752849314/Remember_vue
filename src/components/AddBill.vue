<template>
    <div>
        <el-drawer v-model="drawer"
                   direction="rtl"
                   title="添加账单"
                   :before-close="closeDrawer">
            <el-form :model="bill" ref="formRef" label-width="auto" label-position="right" :rules="rules">
                <el-form-item label="消费类型" prop="consumeType">
                    <el-select v-model="bill.consumeType">
                        <el-option v-for="k of Object.keys(mapping)" :label="mapping[k]" :value="k"
                                   :key="k"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消费金额" prop="consumeMoney">
                    <el-input v-model="bill.consumeMoney" type="number"></el-input>
                </el-form-item>
                <el-form-item label="消费时间" prop="consumeTime">
                    <el-date-picker v-model="bill.consumeTime" type="datetime" placeholder="请选择日期"
                                    format="YYYY-MM-DD hh:mm:ss"
                                    value-format="YYYY-MM-DD hh:mm:ss"/>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="bill.remark"></el-input>
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
import {ConsumeTypeMapping} from "../utils/common.ts"
import {FormInstance, FormRules} from "element-plus"
import {$addBill} from "../api/bill.ts"

const emit = defineEmits(['sync-list'])
const mapping = ConsumeTypeMapping
const formRef = ref<FormInstance>()
const drawer = ref(false)
const closeDrawer = () => {
    drawer.value = false
}
const bill = ref({
    consumeType: '',
    consumeMoney: '',
    consumeTime: '',
    remark: ''
})
const rules = reactive<FormRules<typeof bill>>({
    consumeType: [{required: true, message: '消费类型不能为空', trigger: 'blur'}],
    consumeMoney: [{required: true, message: '消费金额不能为空', trigger: 'blur'}],
    consumeTime: [{required: true, message: '消费时间不能为空', trigger: 'blur'}],
})
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            await $addBill(bill.value)
            emit('sync-list')
            formEl.resetFields()
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