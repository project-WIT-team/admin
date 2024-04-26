<template>
    <!-- table -->
    <div class="centered-content">
        <el-table :data="currentTableData" :row-class-name="colorChangeByNumber">
            <el-table-column prop="id" label="id" width="50" />
            <el-table-column prop="title" label="名称" width="200"
                :formatter="(row: Goods) => (row.title.length > 26 ? row.title.substring(0, 26) + '...' : row.title)" />
            <el-table-column prop="price" label="价格" sortable width="90" />
            <el-table-column prop="bank" label="库存" sortable width="90" />
            <el-table-column prop="storage" label="销量" sortable width="90" />
            <el-table-column prop="postage" label="邮费" sortable width="180" />
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page"
            :page-size="pageSize" :pager-count="7" layout="prev, pager, next" :total="totalData" background>
        </el-pagination>

    </div>
</template>

<script lang="ts" setup>
    import type Goods from '@/interface/goods'
    import { useGoodsListStore } from '@/stores/goodsList';
    import { ref } from 'vue';
    const goodsStore = useGoodsListStore()

    //颜色提醒功能
    const colorChangeByNumber = (params: { row: Goods }) => {
        if (params.row.storage < 100) {
            return 'warning-row'
        } else if (params.row.storage > 2000) {
            return 'success-row'
        }
        return ''
    }

    //分页功能
    let page = ref(1)//当前页
    let pageSize = ref(12)//每页显示的数目
    let totalData = ref()//数据总数
    let currentTableData = ref();//一面的数据
    //获取表格数据,自动分页
    function getTableData() {
        currentTableData.value = goodsStore.goodsList.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
        totalData.value = goodsStore.goodsList.length
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

    .centered-content {
        display: flex
    }


    .el-table .warning-row {
        --el-table-tr-bg-color: #{$warnColor};
    }

    .el-table .success-row {
        --el-table-tr-bg-color: #9fe4cd;
    }
</style>