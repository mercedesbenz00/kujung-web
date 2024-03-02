<script setup lang="ts">
const route = useRoute();
import { Notification } from '~/ts/interfaces/Notification';
import { api } from '~~/ts/api';

// meta
definePageMeta({
    layout: 'page',
    title: '공지사항'
});

const loadingEnd = ref<boolean>(true)
const TAKE_COUNT = 9
const list = ref<Notification[]>([])

onMounted(() => {
    loadList(true)
})

const loadList = (p_refresh: boolean) => {
    api.get(
        `/homepage/notification?page=${parseInt(Number((list.value?.length) / TAKE_COUNT).toFixed(0)) + 1}&take=${TAKE_COUNT}&enabled=true`
    )
        .then(response => {
            if (response.success) {
                list.value = [...list.value, ...response.data.items]
                if (response.data.items.length < TAKE_COUNT) {
                    loadingEnd.value = true
                } else {
                    loadingEnd.value = false
                }
            }
        })
}


</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                공지사항
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루에서 알려드리는 공지사항 입니다.
            </p>

            <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px]" />

            <section class="flex flex-col w-full mt-[25px] md:mt-[75px] lg:mt-[60px]">
                <div
                    class="grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px] mb-[100px] md:mb-[87px] lg:mb-[110px]">
                    <div v-for="slide in list" :key="slide.id" class="flex justify-center">
                        <CardNotice :item="slide" />
                    </div>
                </div>
            </section>

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