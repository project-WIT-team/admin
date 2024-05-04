<template>
    <div class="content">
        <h2 class="title">添加商品</h2>
        <el-form :model="form" label-width="auto" enctype="multipart/form-data" style="max-width: 600px"
            scroll-to-error>
            <el-form-item label="商品主页标题">
                <!-- <el-input v-model="form.title" /> -->
                <el-input v-model="form.title" maxlength="70" style="width: 300px" show-word-limit type="textarea" />
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

            <el-form-item label="分类">
                <el-input v-model="form.type" style="max-width: 150px" />
            </el-form-item>

            <el-form-item label="邮费(为0时包邮)">
                <el-input-number v-model="form.postage" :min="0" />
            </el-form-item>

            <!-- 轮播图上传 -->
            <el-upload :action="httpIns.defaults.baseURL + '/uploadImg'"
                :headers="{ 'Authorization': userStore.userInfo.token }" method="post" v-model:file-list="bannerFile"
                multiple list-type="picture" :on-success="getBannerData" :before-remove="beforeRemove"
                :on-remove="removeBannerImg" drag>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    上传轮播图:
                    拖拽图片或<em>点击上传</em>
                </div>
            </el-upload>


            <!-- 详情图上传 -->
            <el-upload :action="httpIns.defaults.baseURL + '/uploadImg'"
                :headers="{ 'Authorization': userStore.userInfo.token }" method="post" v-model:file-list="detailFile"
                multiple list-type="picture" :on-success="getDetailData" :before-remove="beforeRemove"
                :on-remove="removeDetailImg" drag>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    上传详情图:
                    拖拽图片或<em>点击上传</em>
                </div>
            </el-upload>

            <el-form-item class="button">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="$router.push('/')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue'
    import { ElMessageBox, ElMessage } from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'
    import { UploadFilled } from '@element-plus/icons-vue'
    import httpIns from '@/api/http';
    import qs from 'qs'
    import { useUserStore } from '@/stores/user';
    // 获取表单数据并初始化
    const userStore = useUserStore();

    const form = reactive({
        title: '',
        postage: 0,
        type: '',//分类
        price: 1,
        cost: 1,
        bank: 1,
        place: '0',
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
                ElMessage({
                    message: '添加成功！',
                    type: 'success',
                })
            } else {
                ElMessage({
                    message: '添加失败！',
                    type: 'error',
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const detailFile = ref<UploadUserFile[]>([])
    const bannerFile = ref<UploadUserFile[]>([])


    const removeBannerImg: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        const url = uploadFile.url?.replace(/http:\/\/8\.149\.133\.241:5868/, '') ?? '';
        const index = form.BannerImg.indexOf(url);
        if (index !== -1) {
            form.BannerImg.splice(index, 1);
        }
        console.log('处理：', uploadFile)
        console.log("removed！the rest BannerImg:", form.BannerImg);
    }

    const removeDetailImg: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        const url = uploadFile.url?.replace(/http:\/\/8\.149\.133\.241:5868/, '') ?? '';
        const index = form.detailImg.indexOf(url);
        if (index !== -1) {
            form.detailImg.splice(index, 1);
        }
        console.log('处理：', uploadFile)
        console.log("removed！the rest detailImg:", form.detailImg);
    }



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

    .button {
        text-align: center;
        display: flex;
        align-items: center;
    }


</style>