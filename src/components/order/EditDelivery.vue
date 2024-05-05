<template>
    <h2 class="title">订单发货</h2>
    <el-form :model="form" label-width="auto" enctype="multipart/form-data" style="max-width: 600px" scroll-to-error>
        <el-form-item label="订单号">
            <el-input v-model="OrderId" disabled style="max-width: 50px" />
        </el-form-item>

        <el-form-item label="快递单号">
            <el-input v-model="form.expressId" style="max-width: 300px" />
        </el-form-item>

        <el-form-item label="发货地">
            <el-input v-model="form.deliveryAddr" maxlength="70" style="width: 300px" show-word-limit type="textarea" />
        </el-form-item>
    </el-form>


    <div class="button">
        <el-button type="primary" @click="Submit">提交</el-button>
        <el-button @click="$router.push('/')">取消</el-button>
    </div>

</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { reactive } from 'vue';
    import httpIns from '@/api/http';
    import qs from 'qs'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router';

    //接收订单id
    const route = useRoute()
    const router = useRouter()
    const OrderId = route.query.id;

    const form = reactive({
        id: OrderId,
        expressId: '',
        deliveryAddr: ''
    })


    const Submit = () => {
        httpIns.post('/delivery',
            qs.stringify(form),
        ).then(res => {
            if (res.data.code === 200) {
                ElMessage({
                    message: '发货成功！',
                    type: 'success',
                })
                router.push('/shipOrder')
            } else {
                ElMessage({
                    message: '发货失败！',
                    type: 'error',
                })
            }

        }).catch(err => {
            console.log(err);
        })
    }




</script>




<style scoped>
    .title {
        text-align: center;

    }

    .button {
        margin: auto;
        display: block;

    }


</style>