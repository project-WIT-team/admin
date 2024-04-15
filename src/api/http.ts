import axios from "axios"

// 创建axios实例
const httpIns = axios.create({
    baseURL: "http://192.168.137.1:8080",
    timeout: 15000,
})

// axios请求拦截器,这个拦截器接收两个函数参数
// 第一个函数用于处理请求配置，第二个函数用于处理请求错误
httpIns.interceptors.request.use(
    (config) => {
        console.log(config)
        return config //相应的数据
    },

    (e) => Promise.reject(e) //错误
)

// axios响应式拦截器,这个拦截器也接收两个函数参数，
// 第一个函数用于处理响应数据，第二个函数用于处理响应错误
httpIns.interceptors.response.use(
    (res) => res.data,
    (e) => {
        return Promise.reject(e)
    }
)

export default httpIns
