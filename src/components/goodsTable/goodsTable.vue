<template>
    <!-- table -->
    <div class="centered-content">
        <el-table class="table" :data="currentTableData" border :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="id" label="id" width="50" />
            <!-- <el-table-column prop="title" label="名称" width="200"
                :formatter="(row: any) => (row.title.length > 26 ? row.title.substring(0, 26) + '...' : row.title)" /> -->
            <el-table-column prop="title" label="名称" width="200">
                <template #default="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
                        <span>{{ scope.row.title.length > 30 ? scope.row.title.substring(0, 30) + '...' :
                            scope.row.title }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" sortable width="80" />

            <el-table-column prop="bank" label="库存" sortable width="80" />
            <el-table-column prop="salesVolume" label="销量" sortable width="80" />
            <el-table-column prop="type" label="分类" sortable width="100" />
            <el-table-column prop="postage" label="邮费" sortable width="80" />
            <el-table-column prop="place" label="状态" width="100">
                <template #="scope">
                    <el-tag v-if="scope.row.place === 1" type="success">首页推送</el-tag>
                    <el-tag v-else-if="scope.row.place === 44" type="danger">已下架</el-tag>
                    <el-tag v-else type="primary">已上架</el-tag>
                </template>
            </el-table-column>

            <!-- 默认插槽，作用域为scope，在插槽中的代码能够访问scope，包含三个属性：row、column、$index -->
            <el-table-column prop="" label="图片" width="120px">
                <template #="scope">
                    <el-image style="height: 100px; width:100px" zoom-scale="1.2"
                        :src="`http://8.149.133.241:5868${scope.row.mainImage}`"
                        :preview-src-list="scope.row.topImage.map((image: any) => `http://8.149.133.241:5868${image.path}`)"
                        :zoom-rate="1.2" fit="cover" preview-teleported></el-image>
                </template>
            </el-table-column>
            <!-- 下架 -->
            <el-table-column label="" width="100px">
                <template #="scope">
                    <el-button @click='uploadItemById(scope.row.id)' type="success" plain
                        :disabled="scope.row.place != 44">上架</el-button>
                    <el-button @click='hideItemById(scope.row.id)' type="danger" plain
                        :disabled="scope.row.place == 44">下架</el-button>
                </template>
            </el-table-column>
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
        <el-pagination v-if="totalData" class="pagination" @size-change="sizeChange" @current-change="currentChange"
            :current-page="page" :page-size="pageSize" :pager-count="7" layout="prev, pager, next" :total="totalData"
            background>
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
    import { useGoodsListStore } from '@/stores/goodsList';
    import { ref } from 'vue';
    import qs from 'qs'
    import httpIns from '@/api/http';
    import { ElMessageBox } from 'element-plus'
    import { ElNotification } from 'element-plus'
    import { onMounted } from 'vue';

    const goodsStore = useGoodsListStore()


    //分页功能
    let page = ref(1)//当前页
    let pageSize = ref(12)//每页显示的数目
    let totalData = ref(1)//数据总数
    let currentTableData = ref();//一面的数据
    //获取表格数据,自动分页
    function getTableData() {
        currentTableData.value = goodsStore.goodsList.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
        totalData.value = parseInt(goodsStore.goodsList.length)
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
            `是否删除商品？`,
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(
            () => {
                httpIns.post('/deleteGoods',
                    qs.stringify({ id }),
                ).then((res) => {
                    console.log("请求res:", res);
                    if (res.data.code === 200) {
                        console.log('delete:', id)
                        goodsStore.getGoodsData().then(() => {
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

    function hideItemById(id: number) {
        ElMessageBox.confirm(
            `是否下架？`,
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(
            () => {
                httpIns.post('/hideGoods',
                    qs.stringify({ id }),
                ).then(res => {
                    if (res.data.code == 200) {
                        goodsStore.getGoodsData().then(() => {
                            location.reload();
                            ElNotification({
                                title: '下架成功',
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

    function uploadItemById(id: number) {
        ElMessageBox.confirm(
            `是否上架？`,
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(
            () => {
                httpIns.post('/showGoods',
                    qs.stringify({ id }),
                ).then((res) => {
                    console.log("请求res:", res);
                    if (res.data.code === 200) {
                        goodsStore.getGoodsData().then(() => {
                            location.reload();
                            ElNotification({
                                title: '上架成功',
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
        await goodsStore.getGoodsData();
        getTableData();
    });






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


</style>