<template>

    <el-header class="header">
        <el-menu class="el-menu" :default-active="activeIndex" mode="vertical" :ellipsis="false" router
            text-color="#cfd9df" active-text-color="#6cb6fe">
            <el-menu-item :index="item.id" v-for="item in itemInHeader" class="item">
                <el-icon>
                    <component :is="item.icon" />
                </el-icon>
                {{ item.name }}
                <el-badge v-if="item.id == 'shipOrder'" class="badgeItem" :value="numberToShip" type="warning"
                    :offset="[5, 0]">
                </el-badge>
            </el-menu-item>
        </el-menu>
    </el-header>
</template>


<script lang="ts" setup>
    import { markRaw } from 'vue'
    import { useRoute } from 'vue-router'
    import { CirclePlus, Document, Sell, User, Van } from '@element-plus/icons-vue'
    import { ElBadge } from 'element-plus'
    import { useOrderStore } from '@/stores/order'

    const { numberToShip } = useOrderStore()
    const route = useRoute()

    const activeIndex = route.path.split('/')[1]

    const itemInHeader = [
        { id: 'goodsTable', name: '商品列表', icon: markRaw(Document) },
        { id: 'addGoods', name: '添加商品', icon: markRaw(CirclePlus) },
        { id: 'order', name: '全部订单', icon: markRaw(Sell) },
        { id: 'shipOrder', name: '订单发货', icon: markRaw(Van), badge: ElBadge },
        { id: 'customer', name: '用户信息', icon: markRaw(User) },
    ]
</script>


<style scoped>
    .badgeItem {

        margin-bottom: 35px;
        margin-left: 5px
    }


    .item {
        padding: 0;
        margin: 0;
    }

    .el-menu {
        background-color: #364246;
    }

    .header {
        /* 边框下面加入灰色的分割线 */
        border-bottom: 1px solid #ccc;
        padding: 0;
        /* background-color: #364246 */
    }

    .item {
        color: #fff;
    }


</style>
