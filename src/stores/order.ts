/* 
order接收：
    private int id;//订单id
    private int gid;//商品id
    private int uid;//用户id
    private int sid;//商品样式id
    private int num;//购买数量
    private int pid;//支付订单id
    private BigDecimal price;//支付总金额
    private String payMethod;//支付方式
    private String addr;//收货地址
    private String createTime;//订单创建时间
    private String payTime;//订单支付时间
    private String deliveryTime;//发货时间
    private String confirmTime;//订单确认时间
    private String deliveryMethod;//发货方式
    private int status;//订单状态，1：已生成未支付；2：已支付，未发货；3：已发货，未确认收获；0：订单已完成；
    private String title;//商品名称
    private String img;//商品图片
*/

import httpIns from "@/api/http"

import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export const useOrderStore = defineStore(
    "order",
    () => {
        let orders = ref([
            {
                id: 1,
                title: "商品1",
                price: 100,
                gid: 1,
                uid: 1,
                num: 1,
                address: "北京",
                createTime: "2021-10-01",
                payTime: "2021-10-02",
                deliveryTime: "2021-10-03",
                confirmTime: "2021-10-04",
                deliveryMethod: "顺丰",
                status: 0,
            },
            {
                id: 2,
                title: "商品2",
                price: 200,
                gid: 2,
                uid: 2,
                num: 2,
                address: "上海",
                createTime: "2021-10-01",
                payTime: "2021-10-02",
                deliveryTime: "2021-10-03",
                confirmTime: "2021-10-04",
                deliveryMethod: "圆通",
                status: 1,
            },
            {
                id: 3,
                title: "商品3",
                price: 300,
                gid: 3,
                uid: 3,
                num: 3,
                address: "广州",
                createTime: "2021-10-01",
                payTime: "2021-10-02",
                deliveryTime: "2021-10-03",
                confirmTime: "2021-10-04",
                deliveryMethod: "申通",
                status: 2,
            },
            {
                id: 4,
                title: "商品4",
                price: 400,
                gid: 4,
                uid: 4,
                num: 4,
                address: "深圳",
                createTime: "2021-10-01",
                payTime: "2021-10-02",
                deliveryTime: "2021-10-03",
                confirmTime: "2021-10-04",
                deliveryMethod: "中通",
                status: 3,
            },
            {
                id: 5,
                title: "商品5",
                price: 500,
                gid: 5,
                uid: 5,
                num: 5,
                address: "杭州",
                createTime: "2021-10-01",
                payTime: "2021-10-02",
                deliveryTime: "2021-10-03",
                confirmTime: "2021-10-04",
                deliveryMethod: "韵达",
                status: 0,
            },
            {
                id: 6,
                title: "商品6",
                price: 600,
                gid: 6,
                uid: 6,
                num: 6,
                address: "南京",
                createTime: "2021-10-01",
            },
        ])
        const getOrderData = async () => {
            //从服务器获取数据
            // orders.value = await httpIns.get("/getOrder")
            console.log("success get orders:", orders)
            //todo 规范化 完成order的类型定义
        }

        return { orders, getOrderData }
    },
    {
        persist: true,
    }
)