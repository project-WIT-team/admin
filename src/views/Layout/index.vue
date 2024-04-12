<template>
  <div class="common-layout">
    <el-container>
      <!-- header -->
      <el-header class="header" >
        <PageHeader></PageHeader>
      </el-header>

      <el-container>
        <el-aside width="200px" class="aside">
          <ul>
            <li v-for="item in list" :key="item.name">{{ item.name }} - {{ item.age }}</li>
          </ul>
        </el-aside>

        <el-main>
<router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

  </div>
</template>


<script lang="ts" setup>
  import { ref } from 'vue';
  import PageHeader from '@/components/PageHeader.vue';
  import GoodsTable from '@/components/GoodsTable.vue';


  let list = [
    { name: '张三', age: 18 },
    { name: '李四', age: 19 },
    { name: '王五', age: 20 },
    { name: '赵六', age: 21 },
    { name: '孙七', age: 22 },
    { name: '周八', age: 23 },
  ]


  let itemInHeader = ref([
    { name: '添加商品', },
    { name: '下架商品', },
    { name: '商品列表', },
  ])
</script>


<style scoped>

.el-col {
  border-radius: 10px;
}

.grid-content {
  border-radius: 4px;
  /* min-height: 36px; */
  margin: 5px 0;
}


  .header {
    /* 边框下面加入灰色的分割线 */
    border-bottom: 1px solid #ccc;
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