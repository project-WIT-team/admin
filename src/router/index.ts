import { createRouter, createWebHistory } from "vue-router"
import Layout from "@/views/Layout/index.vue"
import { createWebHashHistory } from "vue-router"

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "首页",
            redirect: "/goodsTable", //重定向
            component: Layout,
            children: [
                {
                    path: "goodsTable",
                    name: "商品列表",
                    component: () => import("@/views/Layout/goods/GoodsTable.vue"),
                },
                {
                    path: "addGoods",
                    name: "添加商品",
                    component: () => import("@/views/Layout/goods/AddGoods.vue"),
                },
                {
                    path: "order",
                    name: "订单列表",
                    component: () => import("@/views/Layout/order/Order.vue"),
                },
                {
                    path: "edit",
                    name: "编辑",
                    component: () => import("@/views/Layout/goods/EditGoods.vue"),
                    //将当前路由的查询参数作为 props 传递给 Vue 组件。这样，Vue 组件就可以通过 props 访问到这些查询参数，
                    //而不需要直接依赖 $route 对象。这有助于使组件更加解耦，更容易进行单元测试。
                    // props: (route) => route.query,
                },
                {
                    path: 'customer',
                    name: "顾客列表",
                    component: () => import('@/views/Layout/customer/Customer.vue')
                },
                {
                    path: 'shipOrder',
                    name: "订单发货",
                    component: () => import('@/views/Layout/order/ShipOrder.vue'),
                },
                {
                    path: 'editDelivery',
                    name: "编辑发货信息",
                    component: () => import('@/views/Layout/order/EditDelivery.vue'),
                }
            ],
        },
        {
            path: "/login",
            name: "登录",
            component: () => import("@/views/Login/index.vue"),
        },

    ],
})

export default router
