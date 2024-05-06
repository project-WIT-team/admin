<template>
    <div class="centered-content">
        <el-table class="table" :data="currentTableData" border :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="id" label="订单号" width="110" sortable />
            <el-table-column prop="title" label="名称" width="180">
                <template #default="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
                        <span>{{ scope.row.title.length > 30 ? scope.row.title.substring(0, 30) + '...' :
                            scope.row.title }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="付款金额" sortable width="110" />
            <el-table-column prop="gid" label="商品id" width="80" />
            <el-table-column prop="createTime" label="创建时间" width="110" />
            <el-table-column prop="payTime" label="支付时间" width="110" />
            <el-table-column prop="num" label="数量" sortable width="80" />
            <el-table-column prop="uid" label="用户id" width="110" />
            <el-table-column prop="addr" label="收货信息" width="150">
                <template #default="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.addr" placement="top">
                        <span>{{ scope.row.addr.length > 25 ? scope.row.addr.substring(0, 25) + '...' :
                            scope.row.addr }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="" label="图片" width="120">
                <template #="scope">
                    <el-image :src="`http://8.149.133.241:5868${scope.row.img}`" fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template #="scope">
                    <el-tag v-if="scope.row.status === 1" type="warning">待支付</el-tag>
                    <el-tag v-else-if="scope.row.status === 2" effect="dark" type='warning'>待发货</el-tag>
                    <el-tag v-else-if="scope.row.status === 3" effect="dark" type="primary">已发货</el-tag>
                    <el-tag v-else-if="scope.row.status === 0" effect="dark" type="success">已完成</el-tag>
                    <el-tag v-else-if="scope.row.status === 44" effect="dark" type="danger">已删除</el-tag>
                    <el-tag v-else type="info">未知</el-tag>
                </template>
            </el-table-column>
            <!-- 删除 -->
            <el-table-column label="" width="90">
                <template #="scope">

                    <el-button v-if="scope.row.status != 44" @click="deleteOrderById(scope.row.id)" type="danger"
                        :icon="Delete" circle />
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination class="pagination" @size-change="sizeChange" @current-change="currentChange" :current-page="page"
            :page-size="pageSize" :pager-count="pageCount" layout="prev, pager, next" :total="totalData" background>
        </el-pagination>
    </div>
</template>

<script lang="ts" setup>
    import { useOrderStore } from '@/stores/order';
    import { ref } from 'vue';
    import { onMounted } from 'vue';
    import { ElMessageBox } from 'element-plus'
    import { ElNotification } from 'element-plus'
    import httpIns from '@/api/http';
    import qs from 'qs'
    import {
        Delete,
    } from '@element-plus/icons-vue'
    const { orders, getOrderData } = useOrderStore();

    const deleteOrderById = (id: number) => {
        ElMessageBox.confirm(
            `是否删除订单？`,
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(
            () => {
                httpIns.post('/deleteOrder',
                    qs.stringify({ id }),
                ).then((res) => {
                    console.log("请求res:", res);
                    if (res.data.code === 200) {
                        console.log('delete:', id)
                        getOrderData().then(() => {
                            location.reload();
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

    //分页功能
    let page = ref(1)//当前页
    let pageSize = ref(10)//每页显示的数目
    let pageCount = ref(7)//分页的最大按钮数
    let totalData = ref(1)//数据总数
    let currentTableData = ref();//一面的数据
    //获取表格数据,自动分页
    function getTableData() {
        currentTableData.value = orders.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
        totalData.value = orders.length
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

    onMounted(async () => {
        await getOrderData();
        getTableData();
    });
    //TODO 订单销量统计

</script>

<style lang="scss" scoped>

    .pagination {
        display: flex;
        align-items: center;
    }

    .centered-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .el-container {
        height: 100vh;

    }

</style>