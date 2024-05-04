// 管理顾客数据
// 1.token

import { defineStore } from "pinia"
import { ref } from "vue"
import httpIns from "@/api/http"

export const useCustomerStore = defineStore(
    "customer",
    () => {
        let customers = ref()

        const getCustomerData = async () => {
            // 如果 customers 已经有数据，那么就不需要再发送请求
            // if (customers.value) {
            //     return
            // }

            const res = await httpIns.get("/getUsers")
            customers.value = res.data.data.users
            console.log("顾客数据：", customers.value)
        }

        return {
            getCustomerData,
            customers
        }
    },
    {
        persist: true,
    }
)
