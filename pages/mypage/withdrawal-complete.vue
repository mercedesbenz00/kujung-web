<script setup lang="ts">
// meta
definePageMeta({
    layout: 'page',
    title: '회원탈퇴-완료'
});

</script>
<template>
    <PageContainer>
        <div class="flex flex-col gap-[24px] justify-center items-center text-center mt-[98px] mb-[196px]">
            <div>
                <h1 class="mb-[14px]">회원 탈퇴하기 완료</h1>
                <p class="text-[13px] md:text-[15px] lg:text-[18px] mt-[14px] md:mt-[28px]">그동안 구정마루를 이용해주셔서 감사합니다.</p>
            </div>

            <NuxtLink class="mt-[50px] md:mt-[40px] lg:mt-[100px] w-[160px] md:w-[420px]" to="/">
                <button class="button-3 " type="button" data-kt-stepper-action="next" @click="">
                    <i class="la la-home"></i>
                    홈으로
                </button>
            </NuxtLink>
        </div>
    </PageContainer>
</template>