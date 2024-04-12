<template>
  <div class="common-layout">
    <el-container>
      <!-- header -->
      <el-header class="header" height="50px">
        <div class="blank"></div>
        <i class="iconfont icon-jishufuwu-copy"></i>
        我是Header
        <ul>
          <li v-for="item in itemInHeader" :key="item.name">{{ item.name }}</li>
        </ul>

      </el-header>

      <el-container>
        <!-- aside -->
        <el-aside width="200px" class="aside">我是Aside
          <ul>
            <li v-for="item in list" :key="item.name">{{ item.name }} - {{ item.age }}</li>
          </ul>

        </el-aside>
        <!-- main -->
        <el-main>
          我是Main

        </el-main>
      </el-container>

    </el-container>

  </div>
</template>


<script lang="ts" setup>
  import { ref } from 'vue';


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
/* 将li里面的项横向排列 */


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

  .blank {
    margin: 10px;
    padding: 0;
  }

  .aside {
    border-right: 1px solid #ccc;
  }
</style>