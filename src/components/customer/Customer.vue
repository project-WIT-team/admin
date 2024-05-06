<template>
    <!-- table -->
    <div class="centered-content">
        <el-table class="table" :data="currentTableData" border :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="id" label="id" width="50" />
            <el-table-column prop="username" label="用户名" width="100" />
            <el-table-column prop="nickname" label="昵称" sortable width="120" />
            <el-table-column prop="addr" label="地址" sortable width="200" />
            <el-table-column prop="email" label="邮箱" sortable width="150" />
            <el-table-column prop="phone" label="手机号" sortable width="130" />
            <el-table-column prop="status" label="状态" width="100">
                <template #="scope">
                    <el-tag v-if="scope.row.status === 1" type="info">未绑定</el-tag>
                    <el-tag v-else-if="scope.row.status === 2" type="success">已绑定</el-tag>
                    <el-tag v-else-if="scope.row.status === 44" type="danger">已封号</el-tag>
                    <el-tag v-else type="primary">未知</el-tag>
                </template>
            </el-table-column>
            <!-- 删除 -->
            <el-table-column label="" width="90">
                <template #="scope">
                    <el-button @click="deleteItemById(scope.row.id)" type="danger" :icon="Delete" circle />
                </template>
            </el-table-column>


        </el-table>
        <!-- 分页 -->
        <el-pagination class="pagination" @size-change="sizeChange" @current-change="currentChange" :current-page="page"
            :page-size="pageSize" :pager-count="7" layout="prev, pager, next" :total="totalData" background>
        </el-pagination>

    </div>
</template>

<script lang="ts" setup>
    import {
        Delete,
    } from '@element-plus/icons-vue'
    import { ref } from 'vue';
    import qs from 'qs'
    import httpIns from '@/api/http';
    import { ElMessageBox } from 'element-plus'
    import { ElNotification } from 'element-plus'
    import { useCustomerStore } from '@/stores/customer';
    import { onMounted } from 'vue';
    const { customers, getCustomerData } = useCustomerStore()

    //分页功能
    let page = ref(1)//当前页
    let pageSize = ref(12)//每页显示的数目
    let totalData = ref(1)//数据总数
    let currentTableData = ref(0);//一面的数据
    //获取表格数据,自动分页
    function getTableData() {
        currentTableData.value = customers.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
        totalData.value = customers.length
        console.log("当前页数据信息:", currentTableData.value);
    }


    function sizeChange(value: number) {
        pageSize.value = value
        page.value = 1
        getTableData()
    }

    function currentChange(value: number) {
        page.value = value
        getTableData()
    }


    function deleteItemById(id: number) {
        ElMessageBox.confirm(
            `是否删除用户？`,
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(
            () => {
                httpIns.post('/deleteUser',
                    qs.stringify({ id }),
                ).then((res) => {
                    if (res.data.code === 200) {
                        getCustomerData().then(() => {
                            // location.reload();
                            ElNotification({
                                title: '删除成功',
                                type: 'success',
                            })
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            () => false
        )
    }


    onMounted(async () => {
        await getCustomerData();
        getTableData();
    });




</script>

<style lang="scss" scoped>
    .table {
        display: inline-block
    }

    .pagination {
        display: flex;
        align-items: center;
    }

    .centered-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }


</style>