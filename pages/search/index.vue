<script setup lang="ts">
import { api } from '~/ts/api';
import { GlobalSearch } from '~/ts/interfaces/GlobalSearch';
import { useModal } from 'vue-final-modal'
import ModalPortfolioDetail from '~~/components/ModalPortfolioDetail.vue';
import { Portfolio } from '~~/ts/interfaces/Portfolio';
import { useStore } from '~/stores/common';
const store = useStore()

const route = useRoute();

// meta
definePageMeta({
    layout: 'page',
    title: '검색결과'
});

const keyword = ref(route.query.keyword ?? "");
const list = ref<GlobalSearch>()

onMounted(() => {
    if (keyword.value.length > 0) {
        loadList()
    }
})

watch(() => route.query.keyword, (newKeyword, oldKeyword) => {
    keyword.value = newKeyword
    list.value = null
    loadList()
})

const loadList = async () => {
    const res = await api.get(`/global-search?q=${keyword.value}`)
    if (res.success) {
        list.value = res.data
    }
}

const onShowDetail = (p_item: Portfolio) => {
    const m = useModal({
        component: ModalPortfolioDetail,
        attrs: {
            onConfirm() {
                store.setCurModalIndicator(null)
        m.close()
            },
            info: p_item
        },
        slots: {
            default: ``,
        },
    })
      store.setCurModalIndicator(m)
  m.open()
}

const hasProductSearchResult = () => {
    return list.value?.productList?.items.length > 0
        || list.value?.catalogList?.items.length > 0
        || list.value?.sampleList?.items.length > 0
        || list.value?.lookBookList?.items.length > 0
        || list.value?.certificationList?.items.length > 0
}

const hasHouseSearchResult = () => {
    return list.value?.onlineHouseList?.items.length > 0
        || list.value?.expertHouseList?.items.length > 0
}

const hasBrandSearchResult = () => {
    return list?.value?.conventionList?.items.length > 0
        || list?.value?.artistList?.items.length > 0
        || list?.value?.brandList?.items.length > 0
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[8px] md:px-0">
            <div v-if="!list || (hasProductSearchResult() || hasHouseSearchResult() || hasBrandSearchResult())"
                class="flex flex-col w-full">
                <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px] lg:self-start">
                    제품 검색 결과
                </p>
                <!-- <p v-if="list"
                    class="text-[13px] font-bold md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line lg:self-start">
                    [<span class="text-[#2087D6]">{{ keyword }}</span>] 총[<span class="text-[#2087D6]">{{
                        list?.productList?.items?.length
                        + list?.certificationList?.items?.length
                        + list?.catalogList?.items?.length
                        + list?.sampleList?.items?.length
                        + list?.lookBookList?.items?.length
                        + list?.conventionList?.items?.length
                        + list?.artistList?.items?.length
                        + list?.brandList?.items?.length
                        + list?.onlineHouseList?.items?.length
                        + list?.expertHouseList?.items?.length
                        + "건의"
                    }}</span>]결과가 검색되었습니다.
                </p> -->

                <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px] mb-[50px] md:mb-[94px] lg:mb-[64px]" />

                <section v-if="hasProductSearchResult()" class="flex flex-col w-full">
                    <p class="text-[18px] md:text-[20px] lg:text-[24px] font-bold">제품소개 검색결과</p>
                    <div v-if="list?.productList?.items.length > 0" class="flex flex-col">
                        <div class="flex flex-row mt-[24px] justify-between items-center">
                            <span class="text-[11px] text-warmGray-600">제품소개
                                <i class="las la-angle-right"></i>&nbsp;<span class="text-[#1A1A1A]">전제품안내</span></span>

                            <button class="w-[150px] h-[32px] text-[13px] border-[1px] border-secondaryNavy-800"
                                @click="() => { navigateTo(`/product`) }">
                                +더보기
                            </button>
                        </div>
                        <div
                            class="mt-[20px] md:mt-[40px] lg:mt-[22px] grid grid-cols-3 lg:grid-cols-4 gap-x-[6px] lg:gap-x-[32px] gap-y-[20px] md:gap-y-[40px] lg:gap-y-[32px]">
                            <CardProduct v-for="item in list?.productList.items" :product="item" />
                        </div>
                        <LineGray class="mt-[50px] md:mt-[40px] lg:mt-[90px] mb-[10px] md:mb-[24px] lg:mb-[34px]" />
                    </div>

                    <div v-if="list?.catalogList?.items.length > 0
                        || list?.sampleList?.items.length > 0
                        || list?.lookBookList?.items.length > 0" class="flex flex-col">
                        <div class="flex flex-row mt-[24px] justify-between items-center">
                            <span class="text-[11px] text-warmGray-600">제품소개
                                <i class="las la-angle-right"></i>&nbsp;<span class="text-[#1A1A1A]">카탈로그</span></span>

                            <button class="w-[150px] h-[32px] text-[13px] border-[1px] border-secondaryNavy-800"
                                @click="() => { navigateTo(`/product/catalogue/catalogue`) }">
                                +더보기
                            </button>
                        </div>
                        <div
                            class="mt-[20px] md:mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[32px] gap-y-[50px] md:gap-y-[40px] lg:gap-y-[56px]">
                            <CardCatalogue
                                v-for="item in [...list?.catalogList.items, ...list?.sampleList.items, ...list?.lookBookList.items]"
                                :item="item" />
                        </div>
                        <LineGray class="mt-[50px] md:mt-[40px] lg:mt-[90px] mb-[10px] md:mb-[24px] lg:mb-[34px]" />
                    </div>

                    <div v-if="list?.certificationList?.items.length > 0" class="flex flex-col">
                        <div class="flex flex-row mt-[24px] justify-between items-center">
                            <span class="text-[11px] text-warmGray-600">제품소개
                                <i class="las la-angle-right"></i>&nbsp;<span class="text-[#1A1A1A]">인증서안내</span></span>

                            <button class="w-[150px] h-[32px] text-[13px] border-[1px] border-secondaryNavy-800"
                                @click="() => { navigateTo(`/product/certificate`) }">
                                +더보기
                            </button>
                        </div>
                        <div
                            class="mt-[20px] md:mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[32px] gap-y-[50px] md:gap-y-[40px] lg:gap-y-[56px]">
                            <CardCertification v-for="item in list?.certificationList.items" :item="item" />
                        </div>
                        <LineGray class="mt-[50px] md:mt-[40px] lg:mt-[90px] mb-[10px] md:mb-[24px] lg:mb-[34px]" />
                    </div>
                </section>


                <section v-if="hasHouseSearchResult()" class="flex flex-col w-full">
                    <p class="text-[18px] md:text-[20px] lg:text-[24px] font-bold">시공사례 검색결과</p>
                    <div v-if="list?.onlineHouseList?.items.length > 0" class="flex flex-col">
                        <div class="flex flex-row mt-[24px] justify-between items-center">
                            <span class="text-[11px] text-warmGray-600">시공사례
                                <i class="las la-angle-right"></i>&nbsp;<span class="text-[#1A1A1A]">랜선집들이</span></span>

                            <button class="w-[150px] h-[32px] text-[13px] border-[1px] border-secondaryNavy-800"
                                @click="() => { navigateTo(`/construction-ex/online#isNormalType`) }">
                                +더보기
                            </button>
                        </div>
                        <div
                            class="mt-[20px] md:mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[32px] gap-y-[50px] md:gap-y-[40px] lg:gap-y-[56px]">
                            <CardHouse v-for="item in list?.onlineHouseList.items" :item="item"
                                :onClick="() => { navigateTo(`/construction-ex/detail?id=${item.id}&isExpertType=false`) }" />
                        </div>
                        <LineGray class="mt-[50px] md:mt-[40px] lg:mt-[90px] mb-[10px] md:mb-[24px] lg:mb-[34px]" />
                    </div>

                    <div v-if="list?.expertHouseList?.items.length > 0" class="flex flex-col">
                        <div class="flex flex-row mt-[24px] justify-between items-center">
                            <span class="text-[11px] text-warmGray-600">시공사례
                                <i class="las la-angle-right"></i>&nbsp;<span class="text-[#1A1A1A]">전문가 집들이</span></span>

                            <button class="w-[150px] h-[32px] text-[13px] border-[1px] border-secondaryNavy-800"
                                @click="() => { navigateTo(`/construction-ex/online#isExpertType`) }">
                                +더보기
                            </button>
                        </div>
                        <div
                            class="mt-[20px] md:mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[32px] gap-y-[50px] md:gap-y-[40px] lg:gap-y-[56px]">
                            <CardHouse v-for="item in list?.expertHouseList.items" :item="item"
                                :onClick="() => { navigateTo(`/construction-ex/detail?id=${item.id}&isExpertType=true`) }" />
                        </div>
                        <LineGray class="mt-[50px] md:mt-[40px] lg:mt-[90px] mb-[10px] md:mb-[24px] lg:mb-[34px]" />
                    </div>
                </section>


                <section v-if="hasBrandSearchResult()" class="flex flex-col w-full">
                    <p class="text-[18px] md:text-[20px] lg:text-[24px] font-bold">브랜드 검색결과</p>
                    <div class="flex flex-col">
                        <div class="flex flex-row mt-[24px] justify-between items-center">
                            <span class="text-[11px] text-warmGray-600">브랜드
                                <i class="las la-angle-right"></i>&nbsp;<span class="text-[#1A1A1A]">ART WORK</span></span>

                            <button class="w-[150px] h-[32px] text-[13px] border-[1px] border-secondaryNavy-800"
                                @click="() => { navigateTo(`/brand/artwork/artwork`) }">
                                +더보기
                            </button>
                        </div>
                        <div
                            class="mt-[20px] md:mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[32px] gap-y-[50px] md:gap-y-[40px] lg:gap-y-[56px]">
                            <CardArtWork
                                v-for="item in [...list?.conventionList.items, ...list?.artistList.items, ...list?.brandList.items]"
                                :item="item" @click="() => { onShowDetail(item) }" />
                        </div>
                        <LineGray class="mt-[50px] md:mt-[40px] lg:mt-[90px] mb-[10px] md:mb-[24px] lg:mb-[34px]" />
                    </div>
                </section>
            </div>
            <div v-else class="flex flex-col my-[200px] justify-center items-center">
                <p class="text-black text-[24px] font-bold">
                    검색하신 {{ keyword }} 대한 검색결과가 없습니다.
                </p>
                <p class="text-warmGray-800 text-[15px] mt-[14px]">
                    정확한 검색어인지 확인하고 다시 검색해 보세요.
                </p>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>