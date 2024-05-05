<template>

    <h2 class="title">编辑商品</h2>
    <el-form :model="form" label-width="auto" enctype="multipart/form-data" style="max-width: 600px" scroll-to-error>
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
    </el-form>
    <div class="button">
        <el-button type="primary" @click="editSubmit">提交</el-button>
        <el-button @click="$router.push('/')">取消</el-button>
    </div>

    <!-- <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
        open
    </el-button>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <span>Hi there!</span>
    </el-drawer> -->

</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import type { UploadUserFile } from 'element-plus'
    import { UploadFilled } from '@element-plus/icons-vue'
    import httpIns from '@/api/http';
    import { useUserStore } from '@/stores/user';
    import { useRoute } from 'vue-router';
    import { useGoodsListStore } from '@/stores/goodsList';
    import useGoodsForm from '@/hooks/useGoodsForm';

    const { form, editSubmit, removeBannerImg, removeDetailImg, beforeRemove, getBannerData, getDetailData } = useGoodsForm();

    const userStore = useUserStore();
    const route = useRoute();
    const goodsId = route.query.id;

    const { goodsList } = useGoodsListStore()

    //在goodsList查找id为goodsId的商品，并将form的值设置为该商品的值
    const goods = goodsList.find((item: any) => item.id == goodsId);
    if (goods) {
        form.id = goods.id;
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
</script>




<style scoped>
    .title {
        text-align: center;

    }

    .button {
        margin: auto;
        /* text-align: center; */
        display: block;
        /* align-items: center; */
    }


</style>