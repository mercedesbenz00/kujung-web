<script setup lang="ts">
import { api } from '~/ts/api';
import { useStore } from '~/stores/common';
import { SmartcareService } from '~/ts/interfaces/SmartcareService';
import { Common } from '~/ts/_utils/common';
import dayjs from 'dayjs';

const route = useRoute();

// meta
definePageMeta({
    layout: 'page',
    title: '스마트케어 서비스 신청 내역'
});

onMounted(() => {
    loadList()
})

const store = useStore()
const activeName = ref('1')

const list = ref<SmartcareService[]>([])

const progressStatus = [
    { color: "bg-[#45E0BB]", name: '접수완료' }
    , { color: "bg-[#E0B545]", name: '컨설팅 예정' }
    , { color: "bg-[#74B9EB]", name: '시공예정' }
    , { color: "bg-[#CFA8D9]", name: '시공완료' }
    , { color: "bg-[#E48D0A]", name: '상담종료' }]

watch(() => store.profileInfo, (newConst, oldConst) => {
    if (newConst != null) {
        loadList()
    }
})

const loadList = async () => {
    const res = await api.post('homepage/smartcare-service/list', {
        q_type: "phone",
        q: store.profileInfo?.phone
    })
    list.value = res.data.items
}
</script>

<template>
    <PageContainer>
        <div class="mypage-container">
            <MyPageMenu />

            <div class="flex flex-col w-full flex-1">
                <section class="hidden lg:flex flex-col">
                    <p class="text-[18px] md:text-[30px] text-black font-bold">
                        스마트케어 서비스 신청 내역
                    </p>
                </section>
                <section class="flex flex-col lg:mt-[45px]">
                    <div class="flex flex-row items-center justify-between">
                        <p class="text-[18px] text-black font-bold">
                            신청서 관리
                        </p>
                    </div>
                </section>
                <section class="flex flex-col w-full mt-[22px]">
                    <LineThick />
                    <div class="flex flex-row py-[20px] md:py-[24px] gap-x-[10px]">
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[98]">
                            No
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[120]">
                            등록일시
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[122]">
                            제품명
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[266]">
                            시공관련 특이사항
                        </p>
                        <p class="text-[12px] md:text-[15px] lg:text-[18px] text-black font-bold text-center flex-[93]">
                            자세히보기
                        </p>
                    </div>
                    <LineGray />
                    <div class="max-w-[1024px] w-full flex items-center justify-center mb-[110px]">
                        <div class="smart-care-collapse w-full">
                            <el-collapse v-model="activeName" class="" accordion>
                                <el-collapse-item :name="index" v-for="(item, index) in list" :key="index">
                                    <template #title class="flex w-full">
                                        <div class='w-full flex flex-col'>
                                            <CardMySmartCare :item="item" :index="index" />
                                        </div>
                                    </template>
                                    <template class="flex flex-col">
                                        <div
                                            class="px-[20px] md:px-[60px] py-[72px] bg-[#FFFEF2] rounded-[10px] w-full max-w-[728px] self-center flex flex-col gap-y-[30px] md:gap-y-[60px]">
                                            <section class="flex flex-col">
                                                <p class="text-[18px] leading-[24px] text-black font-bold">
                                                    1.고객명
                                                </p>
                                                <p class="text-[15px] leading-[20px] text-black mt-[24px]">
                                                    &nbsp;&nbsp;•&nbsp;&nbsp;{{ item.name }}
                                                </p>
                                            </section>

                                            <section class="flex flex-col">
                                                <p class="text-[18px] leading-[24px] text-black font-bold">
                                                    2.주소
                                                </p>
                                                <p class="text-[15px] leading-[20px] text-black mt-[24px]">
                                                    &nbsp;&nbsp;•&nbsp;&nbsp;{{ item.addr + " " + item.addr_sub + "(" +
                                                        item.zonecode + ")" }}
                                                </p>
                                            </section>

                                            <section class="flex flex-col">
                                                <p class="text-[18px] leading-[24px] text-black font-bold">
                                                    3.현재 진행상황
                                                </p>
                                                <div class="mt-[10px] bg-warmGray-800 p-[20px] rounded-[10px]">
                                                    <p class="text-[15px] leading-[20px] text-white">
                                                        <b>스마트 케어 서비스 진행은 총 5단계</b>(접수완료, 컨설팅 예정, 시공예정, 시공완료, 상담종료)
                                                        <b>이며, 세부 내용은 아래를 참고바랍니다.
                                                            상담 진행에 따라 순서 변동 될 수 있습니다.</b>
                                                    </p>
                                                </div>
                                                <div class="flex flex-col mt-[10px] w-full gap-y-[20px]">
                                                    <div class="flex flex-row items-center w-full"
                                                        v-for="step in item.smartcareServiceMemos">
                                                        <p class="text-[15px] leading-[20px] text-black w-[135px]">
                                                            &nbsp;&nbsp;•&nbsp;&nbsp;{{
                                                                dayjs(step.created_at).format("YYYY-MM-DD") }}
                                                        </p>
                                                        <div class="flex flex-row justify-between flex-1">
                                                            <div v-for="(status, index) in progressStatus">
                                                                <div class="progress-tag-on" :class="status.color"
                                                                    v-if="step.status == index + 1">
                                                                    {{ status.name }}
                                                                </div>
                                                                <div v-else class="hidden md:flex progress-tag-normal">
                                                                    {{ status.name }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section class="flex flex-col">
                                                <p class="text-[18px] leading-[24px] text-black font-bold">
                                                    4.연락처
                                                </p>
                                                <p class="text-[15px] leading-[20px] text-black mt-[24px]">
                                                    &nbsp;&nbsp;•&nbsp;&nbsp;{{ Common.formatPhoneNumber(item.phone) }}
                                                </p>
                                            </section>

                                            <section class="flex flex-col">
                                                <p class="text-[18px] leading-[24px] text-black font-bold">
                                                    5.특이사항
                                                </p>
                                                <p class="text-[15px] leading-[20px] text-black mt-[24px]">
                                                    &nbsp;&nbsp;•&nbsp;&nbsp;{{ item.special_note }}
                                                </p>
                                            </section>

                                            <!-- <section class="flex flex-col justify-center items-center">
                                                <Line />
                                                <p
                                                    class="text-[11px] leading-[15px] md:text-[15px] md:leading-[20px] text-black font-bold py-[10px]">
                                                    현재 진행상황은 상담 종료후 재 접수완료가 될 수 있습니다.<br />
                                                    전단계나 다른단계로 갈 수 있으니, 현재 진행상황은 추가될 수 있습니다.
                                                </p>
                                                <Line />
                                            </section> -->
                                        </div>
                                    </template>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss">
.progress-tag-normal {
    @apply bg-secondaryNavy-100 text-[12px] text-[#FFFEF2] w-[82px] h-[24px] items-center justify-center rounded-[12px]
}

.progress-tag-on {
    @apply text-[12px] w-[82px] h-[24px] flex items-center justify-center rounded-[12px]
}
</style>