<template>

  <el-container class="el-container">
    <page-aside></page-aside>
    <!-- main -->
    <router-view></router-view>

  </el-container>

</template>


<script lang="ts" setup>
  import PageAside from '@/components/PageAside.vue';

  import { useGoodsListStore } from '@/stores/goodsList';
  const goodsListStore = useGoodsListStore();
  goodsListStore.getGoodsData();
</script>


<style scoped>
  .el-container {
    height: 100vh;

  }

  .aside {
    border-right: 1px solid #ccc;
  }



</style>