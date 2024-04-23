import httpIns from "@/api/http"

import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export const useGoodsListStore = defineStore(
    "GoodsList",
    () => {
        let goodsList = ref()
        const getGoodsData = async () => {
            //从服务器获取数据
            const {
                data: { goods },
            } = await httpIns.get("/getGoods")
            console.log("success get goods api:", goods)

            goodsList.value = goods
        }
        return { goodsList, getGoodsData }
    },
    {
        persist: true,
    }
)
