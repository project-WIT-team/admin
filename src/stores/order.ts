import httpIns from "@/api/http"
import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { computed } from "vue"

export const useOrderStore = defineStore(
    "order",
    () => {
        let orders = ref([])
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
