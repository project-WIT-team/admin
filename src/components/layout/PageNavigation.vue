<script lang="ts" setup>
    import { useUserStore } from '@/stores/user';
    import router from '@/router';
    const userStore = useUserStore();

    const confirm = () => {
        userStore.clearuserInfo();
        router.push('/login');
    }
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 条件渲染,登陆状态 -->
                <template v-if="userStore.userInfo">
                    <li>
                        <el-popconfirm title="确认退出吗?" @confirm="confirm()" confirm-button-text="确认"
                            cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;" @click="$router.push('/login')">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                </template>
                <!-- 未登陆状态 -->
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>

                </template>
            </ul>
        </div>
    </nav>


</template>


<style scoped lang="scss">
    .app-topnav {
        background: #333;

        ul {
            display: flex;
            height: 50px;
            justify-content: flex-end;
            align-items: center;
            margin: 0;
            padding: 0;
            flex-grow: 1;

            li {
                a {
                    padding: 0 15px;
                    color: #cdcdcd;
                    line-height: 1;
                    display: inline-block;

                    i {
                        font-size: 14px;

                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }

                ~li {
                    a {
                        border-left: 2px solid #666;
                    }
                }
            }
        }
    }
</style>