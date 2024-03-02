<script setup lang="ts">
import { ViewLog } from "~/ts/interfaces/ViewLog";
import { api } from '~~/ts/api';

const route = useRoute();

// meta
definePageMeta({
    layout: 'page',
    title: '최근 본 상품'
});

const viewLogList = ref<ViewLog[]>([])

onMounted(() => {
    getProductViewList()
})

const getProductViewList = async () => {
    const res = await api.get(`/view-log?type=product&take=12`)
    if (res.success) {
        viewLogList.value = res.data.items
    }
}

</script>

<template>
    <PageContainer>
        <div class="mypage-container">
            <MyPageMenu />

            <div class="flex flex-col w-full flex-1 lg:mt-[50px]">
                <section class="flex flex-col flex-1">
                    <div class="flex flex-row items-center justify-between">
                        <p class="text-[18px] text-black font-bold">
                            최근 본 상품
                        </p>
                    </div>
                    <Line class="mt-[15px] border-b-[2px]" />
                    <div
                        class="mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[82px] gap-y-[20px] md:gap-y-[40px] lg:gap-y-[32px]">
                        <CardProduct v-for="item in viewLogList" :product="item.item" />
                    </div>
                </section>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>