import axios from "axios"
import { ElMessage } from "element-plus"
import "element-plus/theme-chalk/el-message.css"
import router from "@/router"
import { useUserStore } from "@/stores/user"

const httpIns = axios.create({
    baseURL: "http://8.149.133.241:5868/admin",

    // baseURL: "http://localhost:8080/admin",
    timeout: 5000,
})

// axios请求拦截器,这个拦截器接收两个函数参数
// 第一个函数用于处理请求配置，第二个函数用于处理请求错误
httpIns.interceptors.request.use(
    (config) => {
        // 1. 从pinia获取token数据
        const userStore = useUserStore()

        // 2. 判断是否有token数据，如果有就添加到请求头
        if (userStore.userInfo) {
            config.headers.Authorization = userStore.userInfo.token
        }

        return config
    },

    (e) => Promise.reject(e)
)

// axios响应式拦截器,这个拦截器也接收两个函数参数，
// 第一个函数用于处理响应数据，第二个函数用于处理响应错误
httpIns.interceptors.response.use(
    (res) => res,
    (e) => {
        console.log(e.response)
        //token失效处理
        if (e.response.status === 466) {
            ElMessage({
                type: "error",
                message: "token失效",
            })
            const userStore = useUserStore()
            userStore.clearUserInfo()
            router.push("/login")
            //密码错误处理
        } else if (e.response.status === 401) {
            ElMessage({
                type: "error",
                message: "密码错误",
            })
            router.push("/login")
        }

        return Promise.reject(e)
    }
)

export default httpIns
