<script setup lang="ts">
import { useStore } from '~/stores/common';
import { WishEntityType } from '~/ts/constants';
import { QuestionAndAnswer } from '~/ts/interfaces/QuestionAndAnswer';
import { ViewLog } from "~/ts/interfaces/ViewLog";
import { Wish } from "~/ts/interfaces/Wish";
import { api } from '~~/ts/api';

const route = useRoute();
const store = useStore()

// meta
definePageMeta({
    layout: 'page',
    title: '마이 페이지'
});

const viewLogList = ref<ViewLog[]>([])
const wishList = ref<Wish[]>([])
const inquiryList = ref<QuestionAndAnswer[]>([])

onMounted(() => {
    getProductViewList()
    getProductWishList()
    loadInquiryList()
})

watch(() => store.profileInfo, (newConst, oldConst) => {
    if (newConst != null) {
        loadInquiryList()
    }
})

const getProductViewList = async () => {
    const res = await api.get(`/view-log?type=product&take=3`)
    if (res.success) {
        viewLogList.value = res.data.items
    }
}

const getProductWishList = async () => {
    const res = await api.get(`/wish?type=${WishEntityType.Product}&take=3`)
    if (res.success) {
        wishList.value = res.data.items
    }
}

const loadInquiryList = () => {
    if (!store.profileInfo) {
        return
    }

    api.post(
        `/question-and-answer/list`, {
        take: 3,
        requester_id: store.profileInfo.id
    }
    )
        .then(response => {
            if (response.success) {
                inquiryList.value = response.data.items
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
                        포인트내역
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
                            <button @click="navigateTo('/mypage/myinfo/edit-main')"
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
                    <div class="flex flex-row items-center justify-between">
                        <p class="text-[18px] text-black font-bold">
                            최근 본 상품
                        </p>
                        <BtnWithLA class="" laName="las la-angle-right" text="제품 전체 보기"
                            :onClick="() => { navigateTo('/mypage/interest/recent-product') }" />
                    </div>
                    <Line class="mt-[15px] border-b-[2px]" />
                    <div
                        class="mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[82px] gap-y-[20px] md:gap-y-[40px] lg:gap-y-[32px]">
                        <CardProduct v-for="item in viewLogList" :product="item.item" />
                    </div>
                </section>

                <section class="flex flex-col flex-1 mt-[50px] md:mt-[80px]">
                    <div class="flex flex-row items-center justify-between">
                        <p class="text-[18px] text-black font-bold">
                            관심 상품
                        </p>
                        <BtnWithLA class="" laName="las la-angle-right" text="제품 전체 보기"
                            :onClick="() => { navigateTo('/mypage/interest/wish-product') }" />
                    </div>
                    <Line class="mt-[15px] border-b-[2px]" />
                    <div
                        class="mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[82px] gap-y-[20px] md:gap-y-[40px] lg:gap-y-[32px]">
                        <CardProduct v-for="item in wishList" :product="item.item" />
                    </div>
                </section>

                <section class="flex flex-col flex-1 mt-[50px] md:mt-[80px]">
                    <div class="flex flex-row items-center">
                        <p class="text-[18px] text-black font-bold">
                            1:1 문의
                        </p>
                        <div class="flex-1" />
                        <BtnWithLA class="mr-[13px]" laName="las la-file-alt" text="문의하기"
                            :onClick="() => { navigateTo('/mypage/my-writes/inquiry-write') }" />
                        <BtnWithLA class="" laName="las la-angle-right" text="전체 보기"
                            :onClick="() => { navigateTo('/mypage/my-writes/inquiry') }" />
                    </div>
                    <Line class="mt-[15px] border-b-[2px]" />
                    <div class="flex flex-row py-[20px] md:py-[24px] gap-x-[10px]">
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[98]">
                            분류
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[266]">
                            제목
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[142]">
                            등록일시
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[93]">
                            상태
                        </p>
                    </div>
                    <LineGray />
                    <div class="grid grid-cols-1">
                        <CardInquiry v-for="item in inquiryList" :item="item" />
                    </div>
                </section>

            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>