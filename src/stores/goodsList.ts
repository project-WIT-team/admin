import httpIns from "@/api/http"

import { defineStore } from "pinia"
import { ref } from "vue"

export const useGoodsListStore = defineStore("GoodsList", () => {
    let goodsList = ref([])
    const getGoodsData = async () => {
        const res = await httpIns.get("/goods/index")
        console.log("success get api:", res.data.goods)
        //将特定的数据格式化为前端需要的数据格式
        goodsList.value = res.data.goods.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
        }))
        return res
    }

    return { goodsList, getGoodsData }
})
