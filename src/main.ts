import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate" //引入持久化插件

import App from "./App.vue"
import router from "./router"

/* 引入 ElementPlus */
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount("#app")
