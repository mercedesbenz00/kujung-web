<script setup lang="ts">
const route = useRoute();
import { Common } from '~/ts/_utils/common';
import { api } from '~/ts/api';
import { SCREEN_WIDTH, CATEGORY_PRICE_LIST } from '~~/ts/constants';
import { Category } from '~/ts/interfaces/Category';
import Dropdown from 'primevue/dropdown';

// meta
definePageMeta({
    layout: 'page',
    title: '견적 내기'
});

const largeCategoryList = ref<Category[]>([])

const selectedCategory = ref<string>('')

const areaList = ref<any[]>([])
const selectedArea = ref<number>(0)

const estimateMinPrice = ref<number>(0)
const estimateMaxPrice = ref<number>(0)

const dismantle = ref(true)
const showEstimatePopup = ref(false)

onMounted(() => {
    for (var i = 4; i < 69; i++) {
        areaList.value.push({ size: i, name: i + "평(" + parseInt(i * 3.3058) + "㎡)" })
    }
    loadCategoryList()
})

const loadCategoryList = () => {
    api.get('/category?order=ASC&sortBy=created_at')
        .then(response => {
            if (response.success) {
                largeCategoryList.value = response.data.items
                largeCategoryList.value.forEach(it => {
                    it.name = it.name.replace("비스포크 마루", "믹스매치")
                    it.minPrice = CATEGORY_PRICE_LIST.find(a => it.name.includes(a.name))?.minPrice
                    it.maxPrice = CATEGORY_PRICE_LIST.find(a => it.name.includes(a.name))?.maxPrice
                })
            }
        })
}

const onToggleDismantle = (p_val: boolean) => {
    dismantle.value = p_val
}

const onEstimate = (p_val: boolean) => {
    if (p_val == false) {
        selectedArea.value = 0
        selectedCategory.value = ""
        showEstimatePopup.value = p_val
        return;
    }
    if (selectedArea.value == 0) {
        Common.showErrorToast("면적을 선택해주세요.")
        return;
    }
    if (selectedCategory.value == "") {
        Common.showErrorToast("마루 종류를 선택해주세요.")
        return;
    }

    const minPrice = largeCategoryList.value.find(it => it.name == selectedCategory.value)?.minPrice
    const maxPrice = largeCategoryList.value.find(it => it.name == selectedCategory.value)?.maxPrice

    if (minPrice == 0) { // 예상 견적 준비중
        estimateMinPrice.value = 0
        estimateMaxPrice.value = 0
    } else {
        estimateMinPrice.value = selectedArea.value * minPrice!
        estimateMaxPrice.value = selectedArea.value * maxPrice!
        if (dismantle.value) { // 철거 진행 (평당 3만원)
            estimateMinPrice.value += selectedArea.value * 30000
            estimateMaxPrice.value += selectedArea.value * 30000
        }
    }
    showEstimatePopup.value = p_val
}

const onDetailEstimate = () => {
    Common.checkLogin(() => {
        navigateTo(`/service/estimate-detailed?selectedCategory=${selectedCategory.value}`)
    })
}


</script>

<template>
    <PageContainer>
        <div class="w-full items-center justify-center flex">
            <div
                class="relative flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
                <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                    견적 내기
                </p>
                <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                    몇 가지 항목을 체크하시고 바닥재 시공 견적을 받아보세요.
                <p class="text-[#2087D6] font-bold whitespace-pre-line">
                    ※ 확장에 대한 평수는 추가 시공이 필요합니다. {{ SCREEN_WIDTH > 768 ? "" : "\n" }} 자세한 내용은 실측시 상담 가능합니다.
                </p>
                </p>

                <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px]" />

                <div class="w-full flex flex-col px-[20px] md:px-0 mt-[50px] lg:mt-[60px]">
                    <section class="flex flex-col w-full">
                        <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                            시공 장소의 전용 면적을 알려주세요.
                        </p>
                        <div class="mt-[10px] md:mt-[13px]">
                            <p class="text-[15px] leading-[20px] md:font-bold">
                                전용면적
                            </p>
                            <div class="w-full mt-[10px] max-w-[360px] lg:max-w-[506px]">
                                <Dropdown v-model="selectedArea" :options="areaList" optionLabel="name" optionValue="size"
                                    placeholder="면적 선택" inputClass="text-black"
                                    class="w-full rounded-0 bg-transparent border-black border-[1px] text-black" />
                            </div>
                        </div>
                    </section>
                    <section class="flex flex-col w-full mt-[50px]">
                        <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                            원하는 시공 범위와 종류를 선택해주세요.
                        </p>
                        <div class="mt-[10px] md:mt-[13px]">
                            <p class="text-[15px] leading-[20px] md:font-bold">
                                마루 종류
                            </p>
                            <div class="w-full mt-[10px] max-w-[360px] lg:max-w-[506px]">
                                <Dropdown v-model="selectedCategory"
                                    :options="largeCategoryList" optionLabel="name" optionValue="name" placeholder="마루 선택"
                                    inputClass="text-black"
                                    class="w-full rounded-0 bg-transparent border-black border-[1px] text-black" />
                            </div>
                        </div>
                    </section>
                    <section class="flex flex-col w-full mt-[50px]">
                        <p class="text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] font-bold">
                            기존 시공되어 있는 제품의 철거 유무를 선택해주세요.
                        </p>
                        <div class="flex flex-row mt-[10px] md:mt-[13px]">
                            <BtnBlackAndGray text="철거 진행" class="flex-1" :selected="dismantle"
                                :onClick="() => { onToggleDismantle(true) }" />
                            <BtnBlackAndGray text="철거 미 진행" class="flex-1" :selected="!dismantle"
                                :onClick="() => { onToggleDismantle(false) }" />
                        </div>
                    </section>
                    <button
                        class="bg-primary-600 w-full h-[70px] md:w-[420px] text-white text-[15px] font-bold self-center mt-[50px] mb-[110px] lg:mb-[120px]"
                        @click="onEstimate(true)">견적내기</button>
                </div>
            </div>


            <div v-if="showEstimatePopup" class="absolute flex flex-col w-full bottom-0 left-0 right-0 top-0">
                <div class="flex-1 bg-[#30302D] w-full opacity-50" @click="showEstimatePopup = false" />
                <div
                    class="flex flex-col w-full bg-warmGray-200 px-[25px] md:px-[64px] lg:px-[125px] items-center justify-center pb-[80px]">
                    <p class="mt-[60px] lg:mt-[46px] text-[18px] md:text-[22px] leading-[24px] md:leading-[30px] font-bold">
                        예상 시공 견적가를 알려드립니다.
                    </p>
                    <div v-if="estimateMinPrice > 0">
                        <p
                            class="mt-[50px] md:mt-[40px] flex flex-row text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] font-bold items-end">
                            예상 견적&nbsp;&nbsp;
                        <p class="text-[24px] md:text-[34px] leading-[26px] md:leading-[36px]">
                            {{
                                estimateMinPrice / 10000 + "~"
                                +
                                estimateMaxPrice / 10000 }}</p>&nbsp;만원 (부가세 포함)
                        </p>
                    </div>
                    <div v-else>
                        <p
                            class="mt-[50px] md:mt-[40px] flex flex-row text-[24px] md:text-[34px] leading-[26px] md:leading-[36px] font-bold items-end">
                            가격 문의
                        </p>
                    </div>

                    <div
                        class="w-full bg-warmGray-400 border border-warmGray-800 py-[26px] md:py-[45px] px-[12px] md:px-[28px] mt-[20px] max-w-[1024px]">
                        <p class="text-[11px] md:text-[13px] lg:text-[15px]">
                            ㆍ시공 환경에 따라 시공 비용 및 철거비가 변경될 수 있습니다.<br />
                            ㆍ본 견적 금액은 참고용입니다. 시공지 상황, 인건비, 시공방법 등에 따라 금액이 달라질 수 있습니다.<br />
                            ㆍ인테리어점에서 정확한 견적을 확인하고 시공할 수 있습니다.<br />
                            ㆍ확장에 대한 평수는 추가 시공이 필요합니다. 자세한 내용은 실측시 상담 가능합니다.
                        </p>
                    </div>
                    <div class="flex flex-row mt-[50px] md:mt-[80px] w-full max-w-[840px]">
                        <button
                            class="flex-1 h-[54px] border text-center text-[15px] leading-[20px] font-bold bg-warmGray-400 border-warmGray-800 text-warmGray-900"
                            @click="() => { onEstimate(false) }">
                            견적 초기화
                        </button>
                        <button
                            class="flex-1 h-[54px] border text-center text-[15px] leading-[20px] font-bold bg-primary-600 border-primary-800 text-white"
                            @click="() => { onDetailEstimate() }">
                            상세 견적내기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss">
.estimate-dropdown {
    @apply p-0 #{!important};

    .el-dropdown-menu__item {
        @apply p-0 #{!important};
    }
}
</style>