<template>
    <el-table :data="goodsStore.tableData" style="width: 100%" :row-class-name="colorChangeByNumber">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="price" label="价格" sortable width="180" />
        <el-table-column prop="number" label="数量" sortable width="180" />
    </el-table>
</template>

<script lang="ts" setup>
    import type Goods from '@/interface/goods';
    import { useGoodsStore } from '../stores/goodsData';
    let goodsStore = useGoodsStore()
    
    const colorChangeByNumber = (params: { row: Goods }) => {
        if (params.row.number < 100) {
            return 'warning-row'
        } else if (params.row.number > 1000) {
            return 'success-row'
        }
        return ''
    }
</script>

<style>
    .el-table .warning-row {
        --el-table-tr-bg-color: #e9644377;
    }

    .el-table .success-row {
        --el-table-tr-bg-color: #35e97e22;
    }
</style>