
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: '/goodsTable',//重定向
      component: Layout,
      children: [
        {
          path: 'goodsTable',
          name: '商品列表',
          component: () => import('@/components/GoodsTable.vue')
        },
        {
          path: 'addGoods',
          name: '添加商品',
          component: () => import('@/components/AddGoods.vue')
        },
        {
          path: 'offGoods',
          name: '下架商品',
          component: () => import('@/components/OffGoods.vue')
        }
      ]
    },


  ]
})

export default router
