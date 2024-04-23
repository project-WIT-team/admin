<template>
    <el-form :model="form" label-width="auto" enctype="multipart/form-data" style="max-width: 600px">
        <el-form-item label="商品主页词条">
            <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item label="商品价格">
            <el-input v-model="form.price" />
        </el-form-item>

        <el-form-item label="商品成本">
            <el-input v-model="form.cost" />
        </el-form-item>

        <el-form-item label="版本">
            <el-input v-model="form.type" />
        </el-form-item>

        <el-form-item label="库存量">
            <el-input v-model="form.bank" />
        </el-form-item>

        <el-form-item label="显示位置">
            <el-input v-model="form.place" />
        </el-form-item>

        <el-form-item label="类别">
            <el-select v-model="form.type" placeholder="请选择分类">
                <el-option label="手机" value="phone" />
                <el-option label="电脑" value="computer" />
            </el-select>
        </el-form-item>

        <el-form-item label="邮费(为0时自动包邮)">
            <el-input v-model="form.postage" />
        </el-form-item>
        I
        <!-- 轮播图上传 -->
        <el-upload action="http://192.168.137.1:8080/admin/uploadImg"
            :headers="{ 'Authorization': userStore.userInfo.token }" method="post" v-model:file-list="file" multiple
            list-type="picture" :on-success="getData" drag>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                上传轮播图:
                拖拽图片或<em>点击上传</em>
            </div>
        </el-upload>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">发送</el-button>
            <el-button>Cancel</el-button>
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
            // {
            //     headers: {
            //         'Content-Type': "application/x-www-form-urlencoded"
            //     }
            // }
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


    const getData = (response: any, file: UploadUserFile, fileList: UploadUserFile[]) => {
        // 服务器返回的响应保存在 response 参数中
        console.log("response", response.data.imgPath);
        //将后端返回的图片路径保存到imgPath中
        form.BannerImg.push(response.data.imgPath)

        console.log("form.BannerImg:", form.BannerImg);

        // // 上传的文件保存在 file 参数中
        // console.log("file:", file);

        // // 所有已上传的文件列表保存在 fileList 参数中
        // console.log("fileList:", fileList);

    };

    // onMounted(() => {
    //     setInterval(() => {
    //         console.log(form.imgPath);
    //     }, 5000);  // 每隔十秒打印一次
    // });
</script>