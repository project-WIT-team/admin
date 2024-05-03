<template>
    <div class="content">
        <h2 class="title">编辑商品</h2>
        <el-form :model="form" label-width="auto" enctype="multipart/form-data" style="max-width: 600px"
            scroll-to-error>
            <el-form-item label="商品id">
                <el-input v-model="goodsId" disabled style="max-width: 50px" />
            </el-form-item>

            <el-form-item label="商品主页标题">
                <el-input v-model="form.title" maxlength="70" style="width: 300px" show-word-limit type="textarea" />
            </el-form-item>

            <el-form-item label="商品价格">
                <el-input-number v-model="form.price" :min="0.01" />
            </el-form-item>

            <el-form-item label="商品成本">
                <el-input-number v-model="form.cost" :min="0.01" />
            </el-form-item>

            <el-form-item label="库存量">
                <el-input-number v-model="form.bank" :min="0" />
            </el-form-item>

            <el-form-item label="显示位置">
                <el-radio-group v-model="form.place">
                    <el-radio value="1">首页推送</el-radio>
                    <el-radio value="0">不推送</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="分类">
                <!-- <el-select v-model="form.type" placeholder="请选择分类" style="width: 300px">
                    <el-option label="电子产品" value="电子产品" />
                    <el-option label="生活用品" value="生活用品" />
                </el-select> -->
                <el-input v-model="form.type" style="max-width: 150px" />
            </el-form-item>

            <el-form-item label="邮费(为0时包邮)">
                <el-input-number v-model="form.postage" :min="0" />

            </el-form-item>

            <!-- 轮播图上传 -->
            <el-upload :action="httpIns.defaults.baseURL + '/uploadImg'"
                :headers="{ 'Authorization': userStore.userInfo.token }" method="post" v-model:file-list="bannerFile"
                multiple drag list-type="picture" :on-success="getBannerData" :before-remove="beforeRemove"
                :on-remove="removeBannerImg">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    上传轮播图:
                    拖拽图片或<em>点击上传</em>
                </div>
            </el-upload>


            <!-- 详情图上传 -->
            <el-upload :action="httpIns.defaults.baseURL + '/uploadImg'"
                :headers="{ 'Authorization': userStore.userInfo.token }" method="post" v-model:file-list="detailFile"
                multiple drag list-type="picture" :on-success="getDetailData" :on-remove="removeDetailImg"
                :before-remove="beforeRemove">
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
    import { ref, reactive, onMounted } from 'vue'
    import { ElMessageBox } from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'
    import { UploadFilled } from '@element-plus/icons-vue'
    import httpIns from '@/api/http';
    import qs from 'qs'
    import { useUserStore } from '@/stores/user';
    import { useRoute } from 'vue-router';
    import { useGoodsListStore } from '@/stores/goodsList';
    import { ElMessage } from 'element-plus'

    const userStore = useUserStore();
    const route = useRoute();
    const goodsId = route.query.id;

    const form = reactive({
        id: goodsId,
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

    const { goodsList } = useGoodsListStore()

    //在goodsList查找id为goodsId的商品，并将form的值设置为该商品的值
    const goods = goodsList.find((item: any) => item.id == goodsId);
    if (goods) {
        form.title = goods.title;
        form.postage = goods.postage;
        form.type = goods.type;
        form.price = goods.price;
        form.cost = goods.cost;
        form.bank = goods.bank;
        form.place = goods.place;
        form.BannerImg = goods.topImage.map((item: any) => item.path);
        form.detailImg = goods.detailedImage.map((item: any) => item.path);
    }

    //向服务器发送数据
    const onSubmit = () => {
        httpIns.post('/updateGoods',
            qs.stringify(form),
        ).then(res => {
            console.log("请求res:", res);
            if (res.data.code === 200) {
                ElMessage({
                    message: '修改成功！',
                    type: 'success',
                })
            } else {
                ElMessage({
                    message: '修改失败！',
                    type: 'error',
                })
            }

        }).catch(err => {
            console.log(err);
        })
    }

    /* 
    使用js的map 方法来将 goods.detailedImage 数组中的每个元素转换为 UploadUserFile 对象，然后将结果赋值给 bannerFile。
    使用了箭头函数来将每个image对象转换为一个UploadUserFile对象。
     */
    const detailFile = ref<UploadUserFile[]>(goods.detailedImage.map((image: any) => ({
        name: '',
        url: `http://8.149.133.241:5868${image.path}`
    })))

    const bannerFile = ref<UploadUserFile[]>(goods.topImage.map((image: any) => ({
        name: '',
        url: `http://8.149.133.241:5868${image.path}`
    })))




    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
        return ElMessageBox.confirm(
            `是否取消上传 ${uploadFile.name} ?`
        ).then(
            () => true,
            () => false
        )
    }
    const removeBannerImg: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        const url = uploadFile.url?.replace(/http:\/\/8\.149\.133\.241:5868/, '') ?? '';
        const index = form.BannerImg.indexOf(url);
        if (index !== -1) {
            form.BannerImg.splice(index, 1);
        }
        console.log('处理图片：', uploadFile)
        console.log("removed！the rest BannerImg:", form.BannerImg);
    }

    const removeDetailImg: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        const url = uploadFile.url?.replace(/http:\/\/8\.149\.133\.241:5868/, '') ?? '';
        const index = form.detailImg.indexOf(url);
        if (index !== -1) {
            form.detailImg.splice(index, 1);
        }
        console.log('处理图片：', uploadFile)
        console.log("removed！the rest detailImg:", form.detailImg);
    }


    const getBannerData = (response: any) => {
        console.log("response:", response.data.imgPath);
        //将后端返回的图片url保存到imgPath中
        form.BannerImg.push(response.data.imgPath)
        console.log("BannerImg:", form.BannerImg);
    };


    const getDetailData = (response: any, file: UploadUserFile, fileList: UploadUserFile[]) => {
        //将后端返回的图片url保存到imgPath中
        form.detailImg.push(response.data.imgPath)
        console.log("detailImg:", form.detailImg);
    };



    // todo表单检测
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