<script setup lang="ts">
import { Common } from '~/ts/_utils/common';
import { PointProduct } from '~/ts/interfaces/PointProduct';
import { api } from '~~/ts/api';

// meta
definePageMeta({
    layout: 'page',
    title: '구정마루 포인트몰'
});

const commandList = ref([{ name: "인기순", selected: true, order: "DESC", sortBy: "view_point" }, { name: "제품 최신순", selected: true, order: "DESC", sortBy: "created_at" }])

const loadingEnd = ref<boolean>(true)
const TAKE_COUNT = 9
const beeList = ref<PointProduct[]>([])
const list = ref<PointProduct[]>([])

onMounted(() => {
    loadBeeList()
    loadList(true)
})

const loadList = (p_refresh: boolean) => {
    if (p_refresh) {
        list.value = []
        loadingEnd.value = true
    }
    api.get(
        `/point-product?page=${parseInt(Number((list.value?.length) / TAKE_COUNT).toFixed(0)) + 1}&take=${TAKE_COUNT}&order=${commandList.value.find(it => it.selected)?.order}&sortBy=${commandList.value.find(it => it.selected)?.sortBy}&is_bee=false`
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

const loadBeeList = () => {
    api.get(
        `/point-product?is_bee=true`
    )
        .then(response => {
            if (response.success) {
                beeList.value = response.data.items
            }
        })
}

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    loadList(true)
}

const onAsk = () => {
    Common.checkLogin(() => {
        navigateTo("/mypage/my-writes/inquiry-write?category=포인트몰")
    })
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <div class="w-full flex flex-col items-center">
                <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                    구정마루 포인트몰
                </p>
                <div class="mt-[40px] lg:mt-[30px] w-full border-[1px] border-[#071222] px-[30px] py-[25px]">
                    <p class="text-[11px] md:text-[15px] leading-[15px] md:leading-[20px] break-keep">
                        <b class="text-[15px] md:text-[18px] leading-[20px] md:leading-[24px]">
                            ※ 구정마루 포인트몰 정책
                        </b><br />
                        <br />
                        ㆍ구매 전 주의사항<br />
                        &nbsp;&nbsp;&nbsp;- 제품의 실물은 개인의 모니터 및 모바일 설정에 따라 차이가 있을 수 있습니다.
                        이에 대한 고객 변심으로 인한 반품비는 고객님 부담이며, 반품을 보내도 배송된 물품의 포인트는 환불되지 않사오니,
                        신중한 구매 부탁드립니다.
                        <br />
                        <br />
                        <br />
                        <b class="text-[15px] md:text-[18px] leading-[20px] md:leading-[24px]">
                            ※ 구정마루 포인트몰 배송안내
                        </b><br />
                        <br />
                        ㆍ택배 배송으로 이루어집니다.<br />
                        ㆍ배송기간 : 주문 후 7일 이내로 발송되며, (영업일 기준) 배송은 발송일로부터 1~3일정도 소요됩니다.<br />
                        ㆍ배송비용 : 자사부담<br />
                        ㆍ기타사항 : 명절, 공휴일 전후 기간의 경우 배송이 길어질 수 있으며, 별도 공지를 통해 사전 전달 드립니다.<br />
                        <br />
                        ㆍ교환, 반품 안내 :<br />
                        &nbsp;&nbsp;&nbsp;- 고객 변심에 의한 교환 및 반품은 불가합니다.<br />
                        &nbsp;&nbsp;&nbsp;- 제품 수령 시 파손된 경우 제품을 교환할 수 있습니다.<br />
                        &nbsp;&nbsp;&nbsp;- 주문 제품과 다른 제품이 배송 되었을 시 반품이 가능합니다.<br />
                        &nbsp;&nbsp;&nbsp;- 반품 완료 된 후 제품에 문제가 없을 시 차감된 포인트는 영업일 기준 7일 내에 복구 됩니다.<br />
                        ㆍ고객센터 : TEL 031-8028-9261ㅣ 상담시간 : 평일 09:00 ~ PM 17:00 / 점심시간 : 12:00 ~ 13:00 ㅣ 토요일, 일요일, 공휴일
                        휴무<br />
                        <br />
                        <b class="text-[15px] md:text-[18px] leading-[20px] md:leading-[24px]">
                            ※ 포인트 적립, 사용, 유효기간 등에 대한 자세한 내용은 회원 약관을 참고하시기 바랍니다.
                        </b>
                    </p>
                </div>
            </div>

            <section class="w-full mt-[53px] md:mt-[100px] lg:mt-[43px]">
                <p class="text-[15px] md:text-[24px] leading-[20px] md:leading-[30px] font-bold">
                    구정 Bee의 추천 제품
                </p>
                <div
                    class="mt-[10px] md:mt-[26px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="(slide, index) in beeList" :key="slide.id" class="flex justify-center">
                        <CardPointMall :item="slide" :index="100" />
                    </div>
                </div>
            </section>

            <Line class="mt-[41px] md:mt-[118px] lg:mt-[108px]" />

            <section
                class="mt-[32px] md:mt-[50px] lg:mt-[93px] flex flex-row self-end justify-end mr-[8px] md:mr-[10px] items-center gap-x-[8px]">
                <BtnWithLA2 class="ml-[5px] h-[33px]" laName="las la-file-alt" text="문의하기" :onClick="() => { onAsk() }" />
                <el-dropdown trigger="click" @command="handleCommand">
                    <button class="dropdown-btn-small w-[120px] el-dropdown-link"
                        :class="commandList.find(it => it.selected) ? 'text-warmGray-900' : 'text-secondarynavy-300'">
                        <span>
                            {{ commandList.find(it => it.selected)?.name || "마루 선택" }}
                        </span>
                        <span>▼</span>
                    </button>
                    <template #dropdown>
                        <el-dropdown-menu v-for="command in commandList" :key="command.name">
                            <el-dropdown-item :command="command.name">{{ command.name }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </section>

            <section class="w-full mt-[53px] md:mt-[100px] lg:mt-[30px]">
                <div
                    class="grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px] mb-[100px] md:mb-[87px] lg:mb-[110px]">
                    <div v-for="(slide, index) in list" :key="slide.id" class="flex justify-center">
                        <CardPointMall :item="slide" :index="index" />
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