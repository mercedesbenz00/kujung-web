<script setup lang="ts">
import { api } from '~/ts/api';
import { Certification } from '~/ts/interfaces/Certification';

const route = useRoute();

// meta
definePageMeta({
    layout: 'page',
    title: '인증서'
});

const list = ref<Certification[]>([])
const loadingEnd = ref<boolean>(true)
const TAKE_COUNT = 9

onMounted(() => {
    loadList(true)
})

const loadList = (p_refresh: boolean) => {
    if (p_refresh) {
        list.value = []
        loadingEnd.value = true
    }
    api.post('/homepage/certification/list', {
        needAllCount: true,
        page: parseInt(Number((list.value?.length) / TAKE_COUNT).toFixed(0)) + 1,
        take: TAKE_COUNT
    })
        .then(response => {
            list.value = [...list.value, ...response.data.items]
            if (response.data.items.length < TAKE_COUNT) {
                loadingEnd.value = true
            } else {
                loadingEnd.value = false
            }
        })
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                인증서
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루의 제품 인증서를 확인하세요
            </p>

            <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px] mb-[50px] md:mb-[94px] lg:mb-[64px]" />

            <div
                class="grid grid-cols-3 gap-x-[6px] lg:gap-x-[32px] gap-y-[50px] md:gap-y-[40px] lg:gap-y-[56px] mb-[100px] md:mb-[87px] lg:mb-[110px]">
                <div v-for="slide in list" :key="slide.id" class="flex justify-center">
                    <CardCertification :item="slide" class="" />
                </div>
            </div>

            <button v-if="!loadingEnd"
                class="mb-[100px] md:mb-[87px] lg:mb-[110px] text-black text-[15px] font-bold border border-black w-[320px] md:w-[420px] h-[54px] md:h-[70px]"
                @click="loadList(false)">
                <i class="las la-plus"></i>&nbsp;
                더 보기
            </button>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>