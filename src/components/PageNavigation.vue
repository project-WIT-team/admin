<script lang="ts" setup>
    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();
</script>

<template>


    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 条件渲染,登陆状态 -->
                <template v-if="userStore.userInfo">
                    <li><a href="javascript:;"><i class=" iconfont icon-user"></i>{{ userStore.userInfo.username }}</a>
                    </li>
                    <li>
                        <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><a href="javascript:;">会员中心</a></li>
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