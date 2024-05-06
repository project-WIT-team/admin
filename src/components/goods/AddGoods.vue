<template>

    <h2 class="title">添加商品</h2>
    <el-form :model="form" label-width="auto" enctype="multipart/form-data" style="max-width: 600px" scroll-to-error>
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
            <el-input-number v-model="form.bank" :min="1" />
        </el-form-item>

        <el-form-item label="显示位置">
            <el-radio-group v-model="form.place">
                <el-radio :value="1">首页推送</el-radio>
                <el-radio :value="0">不推送</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="分类">
            <el-select v-model="form.type" placeholder="请选择分类" style="width: 300px">
                <el-option label="手机" value="手机" />
                <el-option label="电脑" value="电脑" />
                <el-option label="平板" value="平板" />
                <el-option label="男装" value="男装" />
                <el-option label="女装" value="女装" />
                <el-option label="电器" value="电器" />
                <el-option label="食品" value="食品" />
            </el-select>
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
    </el-form>
    <div class="button">
        <el-button type="primary" @click="addSubmit">提交</el-button>
        <el-button @click="$router.push('/')">取消</el-button>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import type { UploadUserFile } from 'element-plus'
    import { UploadFilled } from '@element-plus/icons-vue'
    import httpIns from '@/api/http';
    import { useUserStore } from '@/stores/user';
    import useGoodsForm from '@/hooks/useGoodsForm';
    // 获取表单数据并初始化
    const userStore = useUserStore();

    const { form, addSubmit, removeBannerImg, removeDetailImg, beforeRemove, getBannerData, getDetailData } = useGoodsForm();

    const detailFile = ref<UploadUserFile[]>([])
    const bannerFile = ref<UploadUserFile[]>([])
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