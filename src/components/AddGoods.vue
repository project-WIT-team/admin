<template>
    <el-form :model="form" label-width="auto" enctype="multipart/form-data" style="max-width: 600px"
        action="http://192.168.137.1:8080">
        <el-form-item label="商品主页词条">
            <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item label="商品价格">
            <el-input v-model="form.price" />
        </el-form-item>

        <el-form-item label="商品成本">
            <el-input v-model="form.cost" />
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

        <el-upload v-model:file-list="fileList" multiple :on-preview="handlePreview" :on-remove="handleRemove"
            :before-remove="beforeRemove" :on-exceed="handleExceed">
            <el-button type="primary">上传轮播图</el-button>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png文件大小要小于500KB.
                </div>
            </template>
        </el-upload>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">发送</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'
    import httpIns from '@/api/http';
    import qs from 'qs'


    const fileList = ref<UploadUserFile[]>([
        {
            name: 'element-plus-logo.svg',
            url: 'https://element-plus.org/images/element-plus-logo.svg',
        },
    ])

    const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
        console.log(file, uploadFiles)
    }

    const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
        console.log(uploadFile)
    }

    const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
        ElMessage.warning(
            `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
            } totally`
        )
    }

    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
        return ElMessageBox.confirm(
            `Cancel the transfer of ${uploadFile.name} ?`
        ).then(
            () => true,
            () => false
        )
    }

    const form = reactive({

        title: '',
        class: '',
        postage: '',
        description: '',
        type: '',
        fileList: [],
        price: '',
        cost: '',
        bank: '',
        place: ''
    })

    const onSubmit = () => {


        httpIns.post('/admin/addGoods',
            qs.stringify(form),
            {
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }
        ).then(res => {
            console.log("@@@", res);
            if (res.data.code === 200) {
                console.log('submit!')
            }
        }).catch(err => {
            console.log(err);
        })
    }

</script>