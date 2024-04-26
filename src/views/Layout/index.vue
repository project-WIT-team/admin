<template>

  <el-container>
    <el-header height="50px" class="header"> <page-navigation /> </el-header>
    <el-container>
      <el-aside width="200px" class="aside"><page-aside /></el-aside>
      <el-main class="main"><router-view></router-view></el-main>
    </el-container>
  </el-container>

</template>


<script lang="ts" setup>
  import PageAside from '@/components/layout/PageAside.vue';
  import PageNavigation from '@/components/layout/PageNavigation.vue';
  import { useGoodsListStore } from '@/stores/goodsList';
  const goodsListStore = useGoodsListStore();
  goodsListStore.getGoodsData();
</script>


<style scoped>
  .aside {
    float: left;
    background-color: #364246;
  }

  .header {
    padding: 0;
  }

  .main {

    padding-bottom: 100px;

    display: flex;
    flex-direction: column;
    /* 左右居中 */
    align-items: center;
    /* 上下居中 */
    /* justify-content: center; */
  }

  .el-container {
    height: 100vh;

  }







</style>