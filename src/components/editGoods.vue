<template>
    <h2 class="title">编辑商品</h2>
    <el-form :model="form" label-width="auto" enctype="multipart/form-data" style="max-width: 600px" scroll-to-error>

        <el-form-item label="商品id">
            <el-input v-model="id" disabled style="max-width: 50px" />
        </el-form-item>

        <el-form-item label="商品主页标题">
            <!-- <el-input v-model="form.title" /> -->
            <el-input v-model="form.title" maxlength="30" style="width: 300px" show-word-limit type="textarea" />
        </el-form-item>

        <el-form-item label="商品价格">
            <!-- <el-input v-model="form.price" /> -->
            <el-input-number v-model="form.price" :min="0.01" />
        </el-form-item>

        <el-form-item label="商品成本">
            <!-- <el-input v-model="form.cost" /> -->
            <el-input-number v-model="form.cost" :min="0.01" />
        </el-form-item>

        <el-form-item label="库存量">
            <!-- <el-input v-model="form.bank" /> -->
            <el-input-number v-model="form.bank" :min="0" />
        </el-form-item>

        <el-form-item label="显示位置">
            <el-radio-group v-model="form.place">
                <el-radio value="1">首页推送</el-radio>
                <el-radio value="0">不推送</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="类别">
            <el-select v-model="form.type" placeholder="请选择分类" style="width: 300px">
                <el-option label="电子产品" value="电子产品" />
                <el-option label="生活用品" value="生活用品" />
            </el-select>
        </el-form-item>

        <el-form-item label="邮费(为0时包邮)">
            <el-input-number v-model="form.postage" :min="0" />
            <!-- <el-input v-model="form.postage" /> -->
        </el-form-item>

        <!-- 轮播图上传 -->
        <el-upload :action="httpIns.defaults.baseURL + '/uploadImg'"
            :headers="{ 'Authorization': userStore.userInfo.token }" method="post" v-model:file-list="file" multiple
            list-type="picture" :on-success="getBannerData" drag>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                上传轮播图:
                拖拽图片或<em>点击上传</em>
            </div>
        </el-upload>


        <!-- 详情图上传 -->
        <el-upload :action="httpIns.defaults.baseURL + '/uploadImg'"
            :headers="{ 'Authorization': userStore.userInfo.token }" method="post" v-model:file-list="file" multiple
            list-type="picture" :on-success="getDetailData" drag>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                上传详情图:
                拖拽图片或<em>点击上传</em>
            </div>
        </el-upload>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="$router.push('/')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue'
    import { ElMessageBox } from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'
    import { UploadFilled } from '@element-plus/icons-vue'
    import httpIns from '@/api/http';
    import qs from 'qs'
    import { useUserStore } from '@/stores/user';

    import { useRoute } from 'vue-router';

    //获取路由参数id
    const id = useRoute().query.id;

    const userStore = useUserStore();

    const form = reactive({
        title: '',
        postage: '',
        type: '',//分类
        price: '',
        cost: '',
        bank: '',
        place: '',
        BannerImg: [] as string[],
        detailImg: [] as string[],
    })

    //向服务器发送数据
    const onSubmit = () => {
        httpIns.post('/addGoods',
            qs.stringify(form),
        ).then(res => {
            console.log("请求res:", res);
            if (res.data.code === 200) {
                console.log('submit!')
            }
        }).catch(err => {
            console.log(err);
        })
    }


    const file = ref<UploadUserFile[]>([
    ])



    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
        return ElMessageBox.confirm(
            `是否取消上传 ${uploadFile.name} ?`
        ).then(
            () => true,
            () => false
        )
    }


    const getBannerData = (response: any, file: UploadUserFile, fileList: UploadUserFile[]) => {
        // 服务器返回的响应保存在 response 参数中
        console.log("response", response.data.imgPath);
        //将后端返回的图片路径保存到imgPath中
        form.BannerImg.push(response.data.imgPath)
        console.log("form.BannerImg:", form.BannerImg);
    };

    const getDetailData = (response: any, file: UploadUserFile, fileList: UploadUserFile[]) => {
        //将后端返回的图片路径保存到imgPath中
        form.detailImg.push(response.data.imgPath)
        console.log("form.detailImg:", form.detailImg);
    };
</script>


<style scoped>
    .title {
        text-align: center;
    }
</style>
