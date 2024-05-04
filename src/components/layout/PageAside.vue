<template>

    <el-header class="header">
        <el-menu class="el-menu" :default-active="activeIndex" mode="vertical" :ellipsis="false" @select="handleSelect"
            router text-color="#cfd9df" active-text-color="#6cb6fe">
            <el-menu-item :index="item.id" v-for="item in itemInHeader"><el-icon>
                    <component :is="item.icon" />
                </el-icon>{{ item.name }}</el-menu-item>
        </el-menu>
    </el-header>
</template>

<script lang="ts" setup>
    import { markRaw, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { CirclePlus, Document, Sell, User } from '@element-plus/icons-vue'
    const route = useRoute()

    const activeIndex = ref<string>(route.path.split('/')[1])
    const handleSelect = (key: string) => {
        console.log("当前页:", key)
    }

    let itemInHeader = ref([
        { id: 'goodsTable', name: '商品列表', icon: markRaw(Document) },
        { id: 'addGoods', name: '添加商品', icon: markRaw(CirclePlus) },
        { id: 'order', name: '订单管理', icon: markRaw(Sell) },
        { id: 'customer', name: '用户信息', icon: markRaw(User) }
    ])
</script>

<style scoped>
    .flex-grow {
        flex-grow: 1;
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
