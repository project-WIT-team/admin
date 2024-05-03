<template>
    <!-- table -->
    <div class="centered-content">
        <el-table class="table" :data="currentTableData" :row-class-name="colorChangeByNumber" border align="center">
            <el-table-column prop="id" label="id" width="50" />
            <el-table-column prop="title" label="名称" width="200"
                :formatter="(row: Goods) => (row.title.length > 26 ? row.title.substring(0, 26) + '...' : row.title)" />
            <el-table-column prop="price" label="价格" sortable width="80" />
            <el-table-column prop="bank" label="库存" sortable width="80" />
            <el-table-column prop="storage" label="销量" sortable width="80" />
            <el-table-column prop="postage" label="邮费" sortable width="80" />
            <!-- 默认插槽，作用域为scope，在插槽中的代码能够访问scope，包含三个属性：row、column、$index -->
            <!-- 删除 -->
            <el-table-column label="" width="90">
                <template #="scope">
                    <el-button @click="deleteItemById(scope.row.id)" type="danger" :icon="Delete" circle />
                </template>
            </el-table-column>
            <!-- 编辑 -->
            <el-table-column label="" width="90">
                <template #="scope">
                    <el-button @click="$router.push({ name: '编辑', query: { id: scope.row.id } })" type="primary"
                        :icon="Edit" circle />
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
        Check,
        Delete,
        Edit,
        Message,
        Search,
        Star,
    } from '@element-plus/icons-vue'
    import type Goods from '@/interface/goods'
    import { useGoodsListStore } from '@/stores/goodsList';
    import { ref } from 'vue';
    import qs from 'qs'
    import httpIns from '@/api/http';
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

    function deleteItemById(id: any) {
        httpIns.post('/deleteGoods',
            qs.stringify(id)//商品id
        ).then(res => {
            console.log("请求res:", res);
            if (res.data.code === 200) {
                console.log('delete:', id)
            }
        }).catch(err => {
            console.log(err);
        })
    }

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



    .el-table .warning-row {
        --el-table-tr-bg-color: #{$warnColor};
    }

    .el-table .success-row {
        --el-table-tr-bg-color: #9fe4cd;
    }
</style>