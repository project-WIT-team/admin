
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { reactive } from 'vue'
import httpIns from '@/api/http'
import qs from 'qs'
import { useRouter } from 'vue-router'



export default function () {
    const form = reactive({
        id: 0,
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

    const router = useRouter()

    const addSubmit = () => {
        httpIns.post('/addGoods',
            qs.stringify(form),
        ).then(res => {

            if (res.data.code === 200) {
                ElMessage({
                    message: '添加成功！',
                    type: 'success',
                })
                router.push({ name: '商品列表' })
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


    const editSubmit = () => {
        httpIns.post('/updateGoods',
            qs.stringify(form),
        ).then(res => {

            if (res.data.code === 200) {
                ElMessage({
                    message: '修改成功！',
                    type: 'success',
                })
                router.push({ name: '商品列表' })


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


    const removeBannerImg: UploadProps['onRemove'] = (uploadFile, ) => {
        const url = uploadFile.url?.replace(/http:\/\/8\.149\.133\.241:5868/, '') ?? '';
        const index = form.BannerImg.indexOf(url);
        if (index !== -1) {
            form.BannerImg.splice(index, 1);
        }

        console.log("removed！the rest BannerImg:", form.BannerImg);
    }

    const removeDetailImg: UploadProps['onRemove'] = (uploadFile, ) => {
        const url = uploadFile.url?.replace(/http:\/\/8\.149\.133\.241:5868/, '') ?? '';
        const index = form.detailImg.indexOf(url);
        if (index !== -1) {
            form.detailImg.splice(index, 1);
        }

        console.log("removed！the rest detailImg:", form.detailImg);
    }



    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, ) => {
        return ElMessageBox.confirm(
            `是否取消上传 ${uploadFile.name} ?`
        ).then(
            () => true,
            () => false
        )
    }

    const getBannerData = (response: any) => {

        //将后端返回的图片路径保存到imgPath中
        form.BannerImg.push(response.data.imgPath)
        console.log("form.BannerImg:", form.BannerImg);
    };

    const getDetailData = (response: any) => {
        //将后端返回的图片路径保存到imgPath中
        form.detailImg.push(response.data.imgPath)
        console.log("form.detailImg:", form.detailImg);
    };

    return {
        form, editSubmit, addSubmit, removeBannerImg, removeDetailImg, beforeRemove, getBannerData, getDetailData,
    }
}
