<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect">

        <div class="flex-grow" />
        <el-menu-item :index="item.id" v-for="item in itemInHeader">{{item.name}}</el-menu-item>


    </el-menu>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const activeIndex = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    let itemInHeader = ref([
        { id: '1', name: '添加商品', },
        { id: '2', name: '下架商品', },
        { id: '3', name: '商品列表', },
    ])
</script>

<style>
    .flex-grow {
        flex-grow: 1;
    }
</style>