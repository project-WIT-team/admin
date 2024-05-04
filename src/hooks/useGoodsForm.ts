
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { reactive } from 'vue'
import httpIns from '@/api/http'
import qs from 'qs'

export default function () {
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
    const addSubmit = () => {
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


    //向服务器发送数据
    const editSubmit = () => {
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

    return {
        form, editSubmit, addSubmit, removeBannerImg, removeDetailImg, beforeRemove, getBannerData, getDetailData,
    }
}
