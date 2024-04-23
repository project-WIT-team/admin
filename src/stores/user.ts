// 管理用户数据相关
import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from "@/api/user"

export const useUserStore = defineStore(
    "user",
    () => {
        const userToken = ref()

        const getuserToken = async ({
            username,
            password,
        }: {
            username: string
            password: string
        }) => {
            const res = await loginAPI({ username, password })
            userToken.value = res.data
        }

        const clearuserToken = () => {
            userToken.value = null
        }

        return {
            clearuserToken,
            getuserToken,
            userToken,
        }
    },
    {
        persist: true,
    }
)
