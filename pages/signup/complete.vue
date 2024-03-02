<script setup lang="ts">
import { useStore } from '~/stores/common';

const store = useStore()
// meta
definePageMeta({
    layout: 'page',
    title: '회원가입 완료'
});

</script>
<template>
    <PageContainer>
        <div class="flex flex-col gap-[24px] justify-center items-center text-center mt-[98px] mb-[196px]">
            <div>
                <h1 class="mb-[14px]">회원가입 신청 완료</h1>
                <p class="text-[13px] md:text-[15px] lg:text-[18px] font-bold mt-[14px] md:mt-[28px]">{{store.profileInfo?.nickname}}님 구정마루 회원이 되신 것을
                    환영합니다.<br />
                    지금부터 구정마루의 다양한 서비스를 아용하실 수 있습니다.</p>
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