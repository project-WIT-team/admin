import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from "@/api/user"

export const useUserStore = defineStore(
    "user",
    () => {
        const userInfo = ref()

        const getUserInfo = async ({
            username,
            password,
        }: {
            username: string
            password: string
        }) => {
            const res = await loginAPI({ username, password })
            console.log("login success:", res.data.data.token)
            userInfo.value = res.data.data
        }

        const clearUserInfo = () => {
            userInfo.value = null
        }

        return {
            clearUserInfo,
            getUserInfo,
            userInfo,
        }
    },
    {
        persist: true,
    }
)
