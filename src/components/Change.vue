<template>
    <el-dialog v-model="dialogFormVisible" title="修改信息" width="300">
        <el-form :model="table">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="table.email"/>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="table.phone"/>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker
                        v-model="table.birthday"
                        type="date"
                        placeholder="请选择日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        :default-value="table.birthday"
                />
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
import {ref} from "vue";
import {$ChangeInfo} from "../api/user.ts"

const emit = defineEmits(['sync-list'])

const table = ref({})
let dialogFormVisible = ref(false)


const changeInfo = async () => {
    await $ChangeInfo(table.value, table.value.id)
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