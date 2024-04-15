<template>
    <el-table :data="currentTableData" style="width: 100%" :row-class-name="colorChangeByNumber">
        <!-- <el-table-column type="index" width="50" /> -->
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="price" label="价格" sortable width="180" />
        <el-table-column prop="number" label="数量" sortable width="180" />
        <el-table-column prop="date" label="Date" width="180" />
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page" :page-size="pageSize"
        :pager-count="11" layout="prev, pager, next,total" :total="totalData" background />

</template>

<script lang="ts" setup>
    import type Goods from '@/interface/goods';
    import { useGoodsStore } from '../stores/goodsData';
    import { onMounted, ref } from 'vue';
    let goodsStore = useGoodsStore()


    const colorChangeByNumber = (params: { row: Goods }) => {
        if (params.row.number < 100) {
            return 'warning-row'
        } else if (params.row.number > 1000) {
            return 'success-row'
        }
        return ''
    }

    //分页功能
    let page = ref(1)
    let pageSize = ref(10)
    let totalData = ref()
    let currentTableData = ref();
    //获取表格数据,自动分页
    function getTableData() {
        //一面的数据
        currentTableData.value = goodsStore.tableData.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
        //数据总数
        totalData.value = goodsStore.tableData.length
        console.log(totalData.value, currentTableData.value);
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


    onMounted(() => {
        getTableData()
    })


</script>

<style>
    .el-table .warning-row {
        --el-table-tr-bg-color: #e9644377;
    }

    .el-table .success-row {
        --el-table-tr-bg-color: #35e97e22;
    }
</style>