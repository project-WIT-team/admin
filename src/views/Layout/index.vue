<template>

  <el-container>
    <el-header height="50px" class="header"> <page-navigation /> </el-header>
    <el-container>
      <el-aside class="aside"><page-aside /></el-aside>
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
    min-width: 100px;
    width: 10%;
  }

  .header {
    padding: 0;
  }

  .main {
    float: right;
    width: 90%;

    padding: 0 50px 100px 50px;

    display: flex;
    /* 项目排列方向：垂直排列 */
    flex-direction: column;
    /* 左右居中 */
    align-items: center;

  }


  .el-container {
    height: 100vh;
  }





</style>