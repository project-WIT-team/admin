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
                    component: () => import("@/components/goodsTable/goodsTable.vue"),
                },
                {
                    path: "addGoods",
                    name: "添加商品",
                    component: () => import("@/components/addGoods/addGoods.vue"),
                },
                {
                    path: "order",
                    name: "订单列表",
                    component: () => import("@/components/order/order.vue"),
                },

                {
                    path: "test",
                    name: "测试",
                    component: () => import("@/components/test.vue"),
                },
                {
                    path: "/edit",
                    name: "编辑",
                    component: () => import("@/components/editGoods/editGoods.vue"),
                    props: (route) => route.query,
                },
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
