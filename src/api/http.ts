import axios from "axios"
import { ElMessage } from "element-plus"
import "element-plus/theme-chalk/el-message.css"
import router from "@/router"
import { useUserStore } from "@/stores/user"

// 创建axios实例
const httpIns = axios.create({
    baseURL: "http://192.168.137.1:8080",
    //ts
    // baseURL: "http://192.168.1.106:8080",
    timeout: 5000,
})

// axios请求拦截器,这个拦截器接收两个函数参数
// 第一个函数用于处理请求配置，第二个函数用于处理请求错误
httpIns.interceptors.request.use(
    (config) => {
        return config //相应的数据
    },

    (e) => Promise.reject(e) //错误
)

// axios响应式拦截器,这个拦截器也接收两个函数参数，
// 第一个函数用于处理响应数据，第二个函数用于处理响应错误
httpIns.interceptors.response.use(
    (res) => res.data,
    (e) => {
        ElMessage({
            type: "error",
            message: e.message || "未知错误",
        })
        //401token失效处理
        if (e.response.status === 401) {
            const userStore = useUserStore()
            userStore.clearUserInfo()
            router.push("/login")
        }

        return Promise.reject(e)
    }
)

export default httpIns
