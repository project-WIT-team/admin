<template>
    <div class="background">
        <el-form ref="formRef" class="sign-up" :model="data" :rules="rules" status-icon>
            <h1 class="sign-up-title">商城后台管理系统</h1>
            <el-form-item prop="username" label="账户">
                <el-input v-model="data.username" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input v-model="data.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-button size="large" class="sign-up-button" @click="doLogin()">点击登录</el-button>
        </el-form>
    </div>
</template>


<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import 'element-plus/theme-chalk/el-message.css'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user'


    //将账号密码传给后端进行验证
    //当验证成功,跳转到首页
    let data = reactive({
        username: '',
        password: ''
    })
    const router = useRouter()


    const formRef = ref()
    const userStore = useUserStore()
    const doLogin = () => {
        const { username, password } = data
        //调用表单组件实例formRef内的方法,只有当表单数据都通过时,才会执行回调函数
        // valid: 所有表单都通过校验  才为true
        formRef.value.validate(async (valid: any) => {
            if (valid) {
                // 调用接口获取用户信息
                await userStore.getUserInfo({ username, password })

                ElMessage({ type: 'success', message: '登录成功' })
                // 跳转首页
                await router.push({ path: '/' })

            }
        })
    }


    // 规则数据对象
    const rules = {
        username: [
            { required: true, message: '用户名不能为空' }
        ],
        password: [
            { required: true, message: '密码不能为空' },
            { min: 6, max: 14, message: '密码长度要求6-14个字符' }
        ]
    }
</script>


<style scoped>
    .background {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('@/assets/picture/glare_color_bright.jpg')
    }

    /*
 * Copyright (c) 2013 Thibaut Courouble
 * http://www.cssflow.com
 * Licensed under the MIT License
 *
 * Sass/SCSS source: https://goo.gl/dR9lvb
 * PSD by Dylan Opet: https://goo.gl/K5zTOL

 */

    body {
        font: 13px/20px 'Helvetica Neue', Helvetica, Arial, sans-serif;

        align-items: center;
    }

    .sign-up {
        position: relative;
        margin: auto;
        width: 300px;
        height: auto;
        padding: 33px 25px 29px;
        background: white;
        border-bottom: 1px solid #c4c4c4;
        border-radius: 10px;
        -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);


    }

    .sign-up:before,
    .sign-up:after {
        content: '';
        position: absolute;
        bottom: 1px;
        left: 0;
        right: 0;
        height: 10px;
        background: inherit;
        border-bottom: 0 solid #d2d2d2;
        border-radius: 4px;
    }

    .sign-up:after {
        /* bottom: 3px; */
        border-color: #dcdcdc;
    }

    .sign-up-title {
        margin: -25px -25px 25px;
        padding: 15px 25px;
        line-height: 35px;
        font-size: 26px;
        font-weight: 300;
        color: #aaa;
        text-align: center;
        text-shadow: 0 1px rgba(255, 255, 255, 0.75);
        background: #f7f7f7;
    }

    .sign-up-title:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 8px;
        background: #c4e17f;
        border-radius: 5px 5px 0 0;
        background-image: -webkit-linear-gradient(to left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
        background-image: -moz-linear-gradient(to left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
        background-image: -o-linear-gradient(to left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
        background-image: linear-gradient(to right, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
    }

    input {
        font-family: inherit;
        color: inherit;
        box-sizing: border-box;
    }

    .sign-up-button {
        position: relative;
        vertical-align: top;
        width: 100%;
        height: 54px;
        padding: 0;
        font-size: 22px;
        color: white;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        background: #f0776c;
        border: 0;
        border-bottom: 2px solid #d76b60;
        border-radius: 5px;
        cursor: pointer;
        -webkit-box-shadow: inset 0 -2px #d76b60;
        box-shadow: inset 0 -2px #d76b60;
    }

    .sign-up-button:active {
        top: 1px;
        outline: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    :-moz-placeholder {
        color: #ccc;
        font-weight: 300;
    }

    ::-moz-placeholder {
        color: #ccc;
        opacity: 1;
        font-weight: 300;
    }

    ::-webkit-input-placeholder {
        color: #a39090;
        font-weight: 300;
    }

    :-ms-input-placeholder {
        color: #ccc;
        font-weight: 300;
    }

    ::-moz-focus-inner {
        border: 0;
        padding: 0;
    }
</style>