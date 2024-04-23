import httpIns from "@/api/http"

import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export const useGoodsListStore = defineStore(
    "GoodsList",
    () => {
        // 使用interface: Goods定义商品数据格式

        let goodsList = ref()
        const getGoodsData = async () => {
            //从服务器获取数据
            const {
                data: { goods },
            } = await httpIns.get("/getGoods")
            console.log("success get api:", goods)
            //将服务器返回的数据格式化为前端需要的数据格式

            goodsList.value = goods
        }

        return { goodsList, getGoodsData }
    },
    {
        persist: true,
    }
)
