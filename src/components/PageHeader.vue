<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect" router=true>

        <div class="flex-grow" />
        <el-menu-item :index="item.id" v-for="item in itemInHeader" >{{ item.name }}</el-menu-item>


    </el-menu>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const activeIndex = ref('3')
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    let itemInHeader = ref([
        { id: 'addGoods', name: '添加商品', },
        { id: 'offGoods', name: '下架商品', },
        { id: 'goodsTable', name: '商品列表', },
    ])
</script>

<style>
    .flex-grow {
        flex-grow: 1;
    }
</style>