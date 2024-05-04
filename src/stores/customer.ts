// 管理顾客数据
// 1.token

import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from "@/api/user"

export const useCustomerStore = defineStore(
    "customer",
    () => {
        const customers = ref()

        const getCustomerInfo = async () => {

        }



        const clearUserInfo = () => {

        }

        return {
            clearUserInfo,
            getCustomerInfo,
            customers
        }
    },
    {
        persist: true,
    }
)
