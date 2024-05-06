import axios from "axios"
import { ElMessage } from "element-plus"
import "element-plus/theme-chalk/el-message.css"
import router from "@/router"
import { useUserStore } from "@/stores/user"
import { AxiosError } from "axios";

const httpIns = axios.create({
    baseURL: "http://8.149.133.241:5868/admin",
    timeout: 5000,
})

//请求拦截器
httpIns.interceptors.request.use(
    (config) => {
        const userStore = useUserStore()
        if (userStore.userInfo) {
            config.headers.Authorization = userStore.userInfo.token
        }
        return config
    },
    (e) => Promise.reject(e)
)
//响应拦截器,处理错误
httpIns.interceptors.response.use(
    (res) => res,
    handleError
)

//处理错误
function handleError(e: AxiosError) {
    // 定义 HTTP 错误状态码常量
    const HTTP_STATUS = {
        TOKEN_INVALID: 466,
        UNAUTHORIZED: 401,
    }

    const errorMessage = {
        [HTTP_STATUS.TOKEN_INVALID]: "token失效",
        [HTTP_STATUS.UNAUTHORIZED]: "密码错误",
        default: "网络错误",
    }

    ElMessage({
        type: "error",
        message: errorMessage[e.response?.status ?? 0] || errorMessage.default,
    })

    if ([HTTP_STATUS.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED].includes(e.response?.status ?? 0)) {
        const { clearUserInfo } = useUserStore()
        clearUserInfo()
        router.push("/login")
    }

    return Promise.reject(e)
}

export default httpIns