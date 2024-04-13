<template>


  <!-- header -->
  <!-- <PageHeader></PageHeader> -->
  <el-container class="el-container">
    <el-aside width="120px" class="aside">
      <page-aside></page-aside>
    </el-aside>

    <!-- main -->
    <router-view></router-view>

  </el-container>

</template>


<script lang="ts" setup>
  import { ref } from 'vue';
  import PageHeader from '@/components/PageHeader.vue';
  import GoodsTable from '@/components/GoodsTable.vue';
  import PageAside from '@/components/PageAside.vue';





</script>


<style scoped>
  .el-container {
    height: 100vh;
  }

  .el-col {
    border-radius: 10px;
  }

  .grid-content {
    border-radius: 4px;
    /* min-height: 36px; */
    margin: 5px 0;
  }




  .iconfont {
    font-size: 15px;
    color: #409EFF;
    margin: 90px 10px 10px;
    vertical-align: middle;
  }


  .aside {
    border-right: 1px solid #ccc;
  }



</style>