<template>


    <el-header class="header"> <el-menu class="el-menu" :default-active="activeIndex" mode="vertical" :ellipsis="false"
            @select="handleSelect" router>
            <el-menu-item :index="item.id" v-for="item in itemInHeader" class="item">{{ item.name }}</el-menu-item>

        </el-menu>
    </el-header>




    <!-- <el-row class="tac">
        <el-col :span="12">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                default-active="2" text-color="#fff">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>Navigator One</span>
                    </template>
<el-menu-item-group title="Group One">
    <el-menu-item index="1-1">item one</el-menu-item>
    <el-menu-item index="1-2">item two</el-menu-item>
</el-menu-item-group>
<el-menu-item-group title="Group Two">
    <el-menu-item index="1-3">item three</el-menu-item>
</el-menu-item-group>
<el-sub-menu index="1-4">
    <template #title>item four</template>
    <el-menu-item index="1-4-1">item one</el-menu-item>
</el-sub-menu>
</el-sub-menu>
<el-menu-item index="2">
    <el-icon><icon-menu /></el-icon>
    <span>Navigator Two</span>
</el-menu-item>
<el-menu-item index="3" disabled>
    <el-icon>
        <document />
    </el-icon>
    <span>Navigator Three</span>
</el-menu-item>
<el-menu-item index="4">
    <el-icon>
        <setting />
    </el-icon>
    <span>Navigator Four</span>
</el-menu-item>
</el-menu>
</el-col>
</el-row> -->


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
