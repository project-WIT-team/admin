<template>
    <div>
        <el-table :data="currentTableData">
            <el-table-column prop="id" label="订单号" width="90" />
            <el-table-column prop="title" label="名称" width="200"
                :formatter="(row: Goods) => (row.title.length > 26 ? row.title.substring(0, 26) + '...' : row.title)" />
            <el-table-column prop="price" label="付款金额" sortable width="110" />
            <el-table-column prop="gid" label="商品id" width="110" />
            <el-table-column prop="createTime" label="创建时间" width="110" />
            <el-table-column prop="PayTime" label="支付时间" width="110" />
            <el-table-column prop="storage" label="购买数量" sortable width="110" />
            <el-table-column prop="uid" label="用户id" width="110" />
            <el-table-column prop="deliveryMethod" label="快递方式" width="110" />
            <el-table-column prop="status" label="状态" width="100" />


            <!--             id: 1,
                title: "商品1",
                price: 100,
                gid: 1,
                uid: 1,
                num: 1,
                address: "北京",
                createTime: "2021-10-01",
                payTime: "2021-10-02",
                deliveryTime: "2021-10-03",
                confirmTime: "2021-10-04",
                deliveryMethod: "顺丰",
                status: 0, -->

        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page"
            :page-size="pageSize" :pager-count="7" layout="prev, pager, next" :total="totalData" background>
        </el-pagination>
    </div>
</template>

<script lang="ts" setup>
    import type Goods from '@/interface/goods'
    import { useOrderStore } from '@/stores/order';
    import { ref } from 'vue';

    const orderStore = useOrderStore()



    //分页功能
    let page = ref(1)//当前页
    let pageSize = ref(10)//每页显示的数目
    let totalData = ref()//数据总数
    let currentTableData = ref();//一面的数据
    //获取表格数据,自动分页
    function getTableData() {
        currentTableData.value = orderStore.orders.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
        totalData.value = orderStore.orders.length
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

    getTableData()

    //todo 添加关闭颜色提醒可选项

</script>

<style lang="scss">




    .el-table .warning-row {
        --el-table-tr-bg-color: red;
    }

    .el-table .success-row {
        --el-table-tr-bg-color: #9fe4cd;
    }
</style>