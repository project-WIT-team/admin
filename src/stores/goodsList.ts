import httpIns from "@/api/http"

import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import type Goods from "@/interface/goods.ts"
export const useGoodsListStore = defineStore("GoodsList", () => {
    // 使用interface: Goods定义商品数据格式

    let goodsList = reactive<Goods[]>([])
    const getGoodsData = async () => {
        //从服务器获取数据
        const {
            data: { goods },
        } = await httpIns.get("/goods/index")
        console.log("success get api:", goods)
        //将服务器返回的数据格式化为前端需要的数据格式
        goodsList = goods.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            cost: item.cost,
            storage: item.storage,
            type: item.type,
            postage: item.postage,
        }))
    }

    return { goodsList, getGoodsData }
})
