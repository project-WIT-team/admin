<template>
    <el-menu class="el-menu" :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect"
        router>
        <el-menu-item :index="item.id" v-for="item in itemInHeader">{{ item.name }}</el-menu-item>
        <!-- <div class="flex-grow" /> -->
    </el-menu>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const activeIndex = ref('goodsTable')
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    let itemInHeader = ref([
        { id: 'goodsTable', name: '商品列表', },
        { id: 'addGoods', name: '添加商品', },
        { id: 'offGoods', name: '下架商品', },
        { id: 'test', name: '测试', }

    ])
</script>

<style scoped>
    .flex-grow {
        flex-grow: 1;
    }

    .el-menu {
        background-color: #89f7fe;
    }




</style>
