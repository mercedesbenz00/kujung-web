<script setup lang="ts">
const route = useRoute();
import { api } from '~~/ts/api';
import { SCREEN_WIDTH } from '~~/ts/constants';
import { Common } from '~~/ts/_utils/common';
import { ManagementLaw } from '~/ts/interfaces/ManagementLaw';


// meta
definePageMeta({
    layout: 'page',
    title: '구정미디어'
});

const type = ref(route.query.type ?? "interior");

const totalCnt = ref<number>(0)
const TAKE_COUNT = 9
const currentPage = ref<number>(1)

const list = ref<ManagementLaw[]>([])

onMounted(() => {
    loadList(1)
})
watch(() => route.query.type, (newId, oldId) => {
    type.value = newId
    loadList(1)
})
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    loadList(val)
}

const loadList = (p_page: number) => {
    currentPage.value = p_page
    if (type.value == "interior") {
        api.get(`/homepage/interior-trend?page=${p_page}&take=${TAKE_COUNT}&sortBy=updated_at&order=DESC`)
            .then(response => {
                if (response.success) {
                    list.value = response.data.items
                    totalCnt.value = response.data.meta.totalCount
                }
            })
    } else {
        api.get(`/homepage/management-law?page=${p_page}&take=${TAKE_COUNT}&sortBy=updated_at&order=DESC`)
            .then(response => {
                if (response.success) {
                    list.value = response.data.items
                    totalCnt.value = response.data.meta.totalCount
                }
            })
    }
}

</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                {{ type == "interior" ? "인테리어 트렌드" : "제품 관리법" }}
            </p>
            <p v-if="type == 'interior'"
                class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루에서 알려드리는 인테리어 트렌드!<br />
                구정 미디어에서 고객에게 추천하는 {{ SCREEN_WIDTH > 726 ? "" : "\n" }}맞춤형 인테리어 트렌드 영상입니다.
            </p>
            <p v-else class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루에서 알려드리는 마루 제품 관리법을{{ SCREEN_WIDTH > 726 ? "" : "\n" }} 핵심 요약한 동영상으로 확인하세요.
            </p>

            <Line class="mt-[26px]" />
            <section class="flex flex-col w-full mt-[82px] md:mt-[112px] lg:mt-[63px]">
                <div
                    class="mt-[20px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="(slide, index) in list" :key="slide.id" class="flex justify-center">
                        <CardMedia :item="slide" :index="currentPage == 1 ? index : 100" />
                    </div>
                </div>
            </section>

            <section class="flex flex-row justify-center mb-[110px] items-center">
                <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background layout="prev, jumper, next"
                    :total="totalCnt" @current-change="handleCurrentChange" />
                <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                    {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>