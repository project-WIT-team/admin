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
import { computed } from "vue"

export const useOrderStore = defineStore(
    "order",
    () => {
        let orders = ref()
        let orderToShip = computed(() => orders.value.filter((order: any) => order.status === 2));
        let numberToShip = computed(() => orderToShip.value.length);

        const getOrderData = async () => {
            const data = await httpIns.get("/getOrder")
            orders.value = data.data.data.orders
        }
        return { orders, orderToShip, numberToShip, getOrderData, }
    },
    {
        persist: true,
    }
)
