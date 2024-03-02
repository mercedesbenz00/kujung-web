<script setup lang="ts">
import { api } from '~~/ts/api';

// meta
definePageMeta({
    layout: 'page',
    title: '로그인'
});

var naver_id_login: any
onMounted(() => {
    naver_id_login = new window.naver_id_login("fbxjVwgnlhH4bw_VjKLU", "http://localhost:3000/login/naver-callback");
    // 접근 토큰 값 출력
    getProfileInfo(naver_id_login.oauthParams.access_token);
});

const getProfileInfo = async (p_token: string) => {
    const res = await api.post('auth/naver-profile', {
        token: p_token
    })

    window.opener.CallParentFunction(res.data)
    window.close()
}

</script>
<template>
    <PageContainer>
        <div id="naver_id_login"></div>
    </PageContainer>
</template>