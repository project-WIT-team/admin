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
                <el-button type="primary" @click="addSubmit">提交</el-button>
                <el-button @click="$router.push('/')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import { useUserStore } from '@/stores/user';


</script>