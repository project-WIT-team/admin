<template>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="商品主页词条">
            <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="类别">
            <el-select v-model="form.class" placeholder="请选择分类">
                <el-option label="手机" value="phone" />
                <el-option label="电脑" value="computer" />
            </el-select>
        </el-form-item>

        <el-form-item label="邮费(为0时自动包邮)">
            <el-input v-model="form.postage" />
        </el-form-item>

        <el-upload v-model:file-list="fileList" action=" " multiple :on-preview="handlePreview"
            :on-remove="handleRemove" :before-remove="beforeRemove" :on-exceed="handleExceed">
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png文件大小要小于500KB.
                </div>
            </template>
        </el-upload>


        <el-form-item label="Activity type">
            <el-checkbox-group v-model="form.type">
                <el-checkbox value="Online activities" name="type">
                    Online activities
                </el-checkbox>
                <el-checkbox value="Promotion activities" name="type">
                    Promotion activities
                </el-checkbox>
                <el-checkbox value="Offline activities" name="type">
                    Offline activities
                </el-checkbox>
                <el-checkbox value="Simple brand exposure" name="type">
                    Simple brand exposure
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources">
            <el-radio-group v-model="form.resource">
                <el-radio value="Sponsor">Sponsor</el-radio>
                <el-radio value="Venue">Venue</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form">
            <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import type { UploadProps, UploadUserFile } from 'element-plus'

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
        name: '',
        class: '',
        postage: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
    })

    const onSubmit = () => {
        console.log('submit!')
    }

</script>