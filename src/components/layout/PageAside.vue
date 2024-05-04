<template>

    <el-header class="header">
        <el-menu class="el-menu" :default-active="activeIndex" mode="vertical" :ellipsis="false" @select="handleSelect"
            router text-color="#cfd9df" active-text-color="#6cb6fe">
            <el-menu-item :index="item.id" v-for="item in itemInHeader">{{ item.name }}</el-menu-item>
        </el-menu>
    </el-header>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    const route = useRoute()

    /* 
    route.path.split('/')[1] 用来获取当前路由路径的第一个部分
    route.path 是当前的路由路径，如/goodsTable/item，split('/') 将这个路径按照 / 分割成多个部分，
    然后 [1] 获取了第一个部分，即goodsTable。
     */
    const activeIndex = ref<string>(route.path.split('/')[1])
    const handleSelect = (key: string) => {
        console.log("当前页:", key)
    }

    let itemInHeader = ref([
        { id: 'goodsTable', name: '商品列表', },
        { id: 'addGoods', name: '添加商品', },
        { id: 'order', name: '订单管理', },
        { id: 'customer', name: '用户信息', }

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
