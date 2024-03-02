<script setup lang="ts">
import { SCREEN_WIDTH } from '~~/ts/constants';

// meta
definePageMeta({
    layout: 'page',
    title: '제품 A/S 서비스'
})

onMounted(() => {
})

</script>

<template>
    <div class="flex flex-col pt-[55px] md:pt-[80px] lg:md:pt-[126px]">
        <section class="w-full flex relative">
            <img src="/img/smartservice/smart_as_banner.png" class="w-full h-[320px] md:h-[600px] object-cover" />
            <div
                class="absolute left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center pt-[50px] md:pt-[50px]">
                <p
                    class="text-[24px] leading-[36px] md:text-[34px] text-white font-bold mt-[10px] md:mt-[16px] lg:mt-[27px]">
                    A/S 시스템
                </p>
                <p
                    class="mx-[30px] text-center text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-white mt-[26px] md:mt-[48px] lg:mt-[37px] break-keep">
                    A/S SYSTEM (사후 서비스)에 관한 규정입니다.
                </p>
            </div>
        </section>

        <section class="w-full bg-white flex flex-col pb-[66px] md:pb-[102px] lg:pb-[94px]">
            <div class="max-w-[1280px] w-full flex flex-col self-center relative">
                <span
                    class="mt-[48px] lg:mt-[107px] mr-[20px] lg:mr-[125px] text-[11px] leading-[15px] text-warmGray-600 self-end">
                    HOME <i class="las la-angle-right"></i>
                    스마트 마루 케어<i class="las la-angle-right"></i>
                    <span class="text-[#1A1A1A] font-bold"> A/S 부분</span>
                </span>
                <div class="w-full flex flex-col items-center mt-[35px] md:mt-[74px] lg:mt-[60px]">
                    <img src="/img/smartservice/smart_as_step1_sm.png" class="md:hidden w-[304px]" />
                    <img src="/img/smartservice/smart_as_step1_md.png" class="hidden md:block lg:hidden w-[727px]" />
                    <img src="/img/smartservice/smart_as_step1_lg.png" class="hidden lg:block w-[1024px]" />

                    <div class="mt-[20px] md:mt-[20px] lg:mt-[24px]">
                        <p
                            class="text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-black text-center font-bold break-keep px-[50px] whitespace-pre-line">
                            A/S SYSTEM {{ SCREEN_WIDTH > 600 ? "" : "\n" }}
                            (사후 서비스)에 관한 규정
                        </p>
                        <p
                            class="text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] text-black text-center break-keep mt-[30px] md:mt-[25px] mx-[50px]">
                            구정마루는 업계 최장 기간인 총 15년의 워런티(무상A/S 1년, 유상A/S 15년)를 지원해드립니다.<br />
                            시공 즉시 대리점에 자재출고에 대한 기록이 남으며, 소비자가 일일히 제품보증을 등록하지 않아도<br />
                            대리점 전산상의 출고 시공일 기준으로 A/S기간이 산정됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="w-full flex items-center justify-center pb-[101px] md:pb-[137px] lg:pb-[86px]">
            <img src="/img/smartservice/smart_as_step2_sm.png" class="md:hidden w-[304px]" />
            <img src="/img/smartservice/smart_as_step2_md.png" class="hidden md:block lg:hidden w-[727px]" />
            <img src="/img/smartservice/smart_as_step2_lg.png" class="hidden lg:block w-[1024px]" />
        </section>

        <section class="w-full flex flex-col items-center justify-center pb-[66px] md:pb-[102px] lg:pb-[94px]">
            <img src="/img/smartservice/smart_as_step3_sm.png" class="md:hidden w-[304px]" />
            <img src="/img/smartservice/smart_as_step3_md.png" class="hidden md:block lg:hidden w-[727px]" />
            <img src="/img/smartservice/smart_as_step3_lg.png" class="hidden lg:block w-[1024px]" />

            <div class="mt-[59px] md:mt-[110px] lg:mt-[89px] w-full max-w-[304px] md:max-w-[727px] lg:max-w-[1024px]">
                <p
                    class="hidden md:block text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-black text-center font-bold break-keep px-[50px] whitespace-pre-line">
                    구정마루 무ㆍ유상 A/S 규정
                </p>
                <p
                    class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold break-keep mt-[0px] md:mt-[110px] lg:mt-[50px]">
                    <i class="las la-check text-[20px] md:text-[30px] font-bold"></i>&nbsp;&nbsp;무상 A/S규정 및 안내
                </p>
                <p class="mt-[14px] text-[11px] md:text-[15px] leading-[18px] md:leading-[24px] font-bold md:ml-[40px]">
                    자재성 하자로 판명되는 경우 구정마루 A/S마스터팀이 진행합니다.<br />
                    ※시공 후 3개월 안에 대부분의 하자 (95%)가 판명 납니다.
                </p>

                <p
                    class="text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-black font-bold break-keep mt-[55px] md:mt-[110px] lg:mt-[66px]">
                    <i class="las la-check text-[20px] md:text-[30px] font-bold"></i>&nbsp;&nbsp;유상 A/S규정 및 안내
                </p>
                <p class="mt-[14px] text-[10px] md:text-[15px] leading-[18px] md:leading-[24px] font-bold md:ml-[40px]">
                    1. 누수, 결로현상 또는 건축물 구조상 문제로 제품이 '변색'등 손상된 경우<br />
                    2. 바닥 미장면(크랙, 평활도, 불량 등) 문제 또는 접합부 마감재 오사용으로 인한 문제<br />
                    3. 함수율 관리 미흡의 시공인 경우<br />
                    (기초공사인 바닥건조 작업이 제대로 이루어지지 않은 경우)<br />
                    4. 구정마루에서 보증하는 시공팀이 아닌(대리점 및 인테리어 제휴점)일반인이<br />
                    시공 및 보수를 하여 문제가 발생했을 경우<br />
                    5. 고객 부주의 및 과실로 인한 마루파손(찍힘, 스크레치, 자재변색)의 경우<br />
                    6. 구정마루 표준시방서에 의거 하지 않은 시공을 한 경우
                </p>

                <div
                    class="mt-[50px] md:mt-[100px] lg:mt-[60px] bg-[#FFFEF2] rounded-[20px] md:rounded-[30px] py-[25px] md:py-[57px] lg:py-[70px] mx-[-20px] md:mx-[0] md:justify-center md:items-center flex">
                    <p class="text-[11px] md:text-[18px] leading-[15px] md:leading-[26px] px-[10px]">
                        · 마루는 목질제품으로 현장환경과 실측 및 시공이 굉장히 중요합니다.<br />
                        · 구정마루 대리점과 현장확인 후 본사에 접수 해주시면 원활한 A/S가 가능합니다.
                    </p>
                </div>
            </div>
        </section>


        <section class="w-full flex flex-col items-center justify-center relative">
            <img src="/img/smartservice/smart_as_banner_bottom.png"
                class="w-full h-[460px] md:h-[584px] lg:h-[685px] object-cover" />
            <div class="flex flex-col absolute top-0 right-0 bottom-0 left-0 items-center">
                <img src="/img/smartservice/smart_as_step4_sm.png" class="md:hidden w-[304px]" />
                <img src="/img/smartservice/smart_as_step4_md.png" class="hidden md:block lg:hidden w-[727px]" />
                <img src="/img/smartservice/smart_as_step4_lg.png" class="hidden lg:block w-[1024px]" />

                <div class="mt-[59px] md:mt-[110px] lg:mt-[149px] w-full max-w-[304px] md:max-w-[727px] lg:max-w-[1024px]">
                    <p
                        class="hidden md:block text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-white text-center font-bold break-keep px-[50px] whitespace-pre-line">
                        천연 목재 제품에 대한 A/S 규정
                    </p>
                    <p
                        class="block md:hidden text-[15px] leading-[20px] md:text-[24px] md:leading-[36px] text-white font-bold break-keep mt-[0px] md:mt-[10px] lg:mt-[91px]">
                        <i class="las la-check text-[20px] md:text-[30px] font-bold"></i>&nbsp;&nbsp;천연 목재 제품에 대한 A/S 규정
                    </p>
                    <p
                        class="mt-[14px] md:mt-[47px] lg:mt-[100px] text-[11px] text-white md:text-[18px] text-start md:text-center leading-[26px] md:leading-[24px] font-bold md:ml-[40px]">
                        원목제품은 자연소재이며, 주변 환경따라 수축, 팽창 또는 휘거나 갈라집이 보일 수 있습니다.<br />
                        이것은 천연 원목의 고유 특징인 습도조절로 일어나는 자연스러운 현상으로<br />
                        주변 온도 및 습도 변화에 따라 점차 안정됩니다.
                        변형으로 인한 자재의 복원력을 가지고 있으니 참고 부탁드립니다.<br />
                        또한 같은 원목의 소재로 만든 제품이라도 나뭇결, 색상이 다르면
                        그 외의 공정 및 다른 요인으로도 다양하게 표현됩니다.<br />
                        따라서, 원목 고유의 특징으로 인한 반품은 사유가 되지 않습니다.
                    </p>
                </div>
            </div>
        </section>

    </div>
</template>

<style lang="scss"></style>