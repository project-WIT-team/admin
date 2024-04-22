<template>





  <el-container>
    <el-header height="50px" class="header"> <page-navigation></page-navigation> </el-header>
    <el-container>
      <el-aside width="200px"><page-aside></page-aside></el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>






</template>


<script lang="ts" setup>

  import PageNavigation from '@/components/PageNavigation.vue';
  import PageAside from '@/components/PageAside.vue';


  import { useGoodsListStore } from '@/stores/goodsList';
  const goodsListStore = useGoodsListStore();
  goodsListStore.getGoodsData();
</script>


<style scoped>
  .header {
    padding: 0;
  }

  .el-container {
    height: 100vh;

  }





</style>