<template>
    <div class="">

        <button @click="onSubmit">submit</button>
    </div>
</template>


<script lang="ts" setup>
    import httpIns from '@/api/http';
    import { ref } from 'vue';
    let name = ref('')
    const onSubmit = () => {
        httpIns.defaults.headers.common['Authorization'] = '';
        httpIns.post('/admin/test', {
            name: 1
        }).then(res => {
            console.log(res);
            // 假设服务器在响应的 data 属性中返回了 token
        }).catch(err => {
            console.log("failed:", err);
        })
    }
</script>


<style scoped></style>