// 管理用户数据
import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from "@/api/user"

export const useUserStore = defineStore(
    "user",
    () => {
        const userInfo = ref()

        const getuserInfo = async ({
            username,
            password,
        }: {
            username: string
            password: string
        }) => {
            const res = await loginAPI({ username, password })
            userInfo.value = res.data
        }

        const clearuserInfo = () => {
            userInfo.value = null
        }

        return {
            clearuserInfo,
            getuserInfo,
            userInfo,
        }
    },
    {
        persist: true,
    }
)
