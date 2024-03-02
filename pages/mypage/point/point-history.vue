<script setup lang="ts">
import { useStore } from '~/stores/common';
import { PointLog } from '~/ts/interfaces/PointLog';
import { api } from '~~/ts/api';

const route = useRoute();
const store = useStore()

// meta
definePageMeta({
    layout: 'page',
    title: '포인트 내역'
});
const totalCnt = ref<number>(0)
const TAKE_COUNT = 9
const currentPage = ref<number>(1)

const list = ref<PointLog[]>([])

onMounted(() => {
    loadList(1)
})
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    loadList(val)
}

watch(() => store.profileInfo, (newConst, oldConst) => {
    if (newConst != null) {
        loadList(1)
    }
})

const loadList = (p_page: number) => {
    if (!store.profileInfo) {
        return
    }

    currentPage.value = p_page
    api.get(
        `/point-log?take=${TAKE_COUNT}&page=${p_page}&user_id=${store.profileInfo.id}&sortBy=created_at&order=DESC`
    )
        .then(response => {
            if (response.success) {
                list.value = response.data.items
                totalCnt.value = response.data.meta.totalCount
            }
        })
}

</script>

<template>
    <PageContainer>
        <div class="mypage-container">
            <MyPageMenu />

            <div class="flex flex-col w-full flex-1">
                <section class="flex flex-col flex-1">
                    <p class="text-[18px] md:text-[30px] text-black font-bold">
                        포인트 내역
                    </p>
                    <div
                        class="mt-[28px] md:mt-[20px] lg:mt-[36px] flex flex-col md:flex-row bg-[#F2EFE2] border border-[#071222] px-[50px] py-[36px] items-center justify-center">
                        <div class="flex-1 flex flex-col md:flex-row">
                            <div class="flex flex-row items-center">
                                <div
                                    class="w-[50px] h-[50px] md:w-[75px] md:h-[75px] bg-warmGray-600 rounded-[50%] flex items-center justify-center">
                                    <font-awesome-icon icon="fa-regular fa-user"
                                        class="text-[20px] md:text-[33px] text-white" />
                                    <i class="fa-regular fa-user"></i>
                                </div>
                                <div class="flex flex-col ml-[10px] md:ml-[13px]">
                                    <p class="text-[15px] md:text-[18px] text-black font-bold">
                                        {{ store.profileInfo?.nickname }} 님
                                    </p>
                                    <p class="text-[11px] md:text-[13px] md:mt-[8px] text-black">
                                        {{ store.profileInfo?.email }}
                                    </p>
                                </div>
                            </div>
                            <button
                                class="border border-warmGray-600 bg-warmGray-200 px-[18px] md:px-[24px] text-[11px] font-bold h-[30px] md:h-[33px] mt-[11px] ml-[60px] lg:ml-[18px] lg:mt-[35px]">
                                회원정보수정
                            </button>
                        </div>

                        <div class="flex sm:flex-row md:flex-col items-center md:items-end mt-[40px] md:mt-0">
                            <p class="text-[18px] text-black font-bold">
                                현재 보유 포인트
                            </p>
                            <p class="text-[30px] text-black font-bold ml-[17px] md:ml-0 md:mt-[9px]">
                                {{ store.profileInfo?.point?.toLocaleString() }}P
                            </p>
                        </div>
                    </div>
                </section>

                <section class="flex flex-col flex-1 mt-[50px] md:mt-[80px]">
                    <div class="flex flex-row items-center">
                        <p class="text-[18px] text-black font-bold">
                            적립/사용 내역
                        </p>
                    </div>
                    <Line class="mt-[15px] border-b-[2px]" />
                    <div class="flex flex-row py-[20px] md:py-[24px] gap-x-[10px]">
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[98]">
                            적립일시
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[266]">
                            내역
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[142]">
                            적립/차감
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[93]">
                            적립금
                        </p>
                    </div>
                    <LineGray />
                    <div class="grid grid-cols-1">
                        <CardPointHistory v-for="item in list" :item="item" />
                    </div>
                </section>

                <section class="flex flex-row justify-center mt-[100px] items-center">
                    <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background
                        layout="prev, jumper, next" :total="totalCnt" @current-change="handleCurrentChange" />
                    <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                        {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
                </section>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>