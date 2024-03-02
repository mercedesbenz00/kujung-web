<script setup lang="ts">
import { Common } from '~/ts/_utils/common';
import { SCREEN_WIDTH } from '~~/ts/constants';

// meta
definePageMeta({
    layout: 'page',
    title: '스마트 케어 서비스란'
})

onMounted(() => {
})

</script>

<template>
    <div class="flex flex-col pt-[55px] md:pt-[80px] lg:md:pt-[126px]">
        <section class="w-full flex relative">
            <img src="/img/smartservice/smart_care_banner_md.png"
                class="w-full h-[400px] md:h-[600px] object-cover hidden md:block" />
            <img src="/img/smartservice/smart_care_banner_sm.png"
                class="w-full h-[400px] md:h-[600px] object-cover md:hidden" />
            <div
                class="absolute left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center pt-[50px] md:pt-[100px]">
                <p class="text-[24px] leading-[36px] md:text-[34px] text-white font-bold">
                    SMART CARE SERVICE
                </p>
                <p
                    class="text-[24px] leading-[36px] md:text-[34px] text-white font-bold mt-[10px] md:mt-[16px] lg:mt-[27px]">
                    스마트 케어 서비스
                </p>
                <p
                    class="md:hidden mx-[30px] text-center text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-white mt-[26px] md:mt-[36px] lg:mt-[25px] break-keep">
                    대한민국 프리미엄 마루대표 브랜드, 구정마루의 30년 시공기술과
                    전문 노하우를 접목한 1:1 고객 맞춤 마루 전문 케어 입니다.
                </p>
                <p
                    class="hidden md:flex mx-[30px] text-center text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-white mt-[26px] md:mt-[36px] lg:mt-[25px] break-keep">
                    대한민국 프리미엄 마루대표 브랜드, 구정마루의 30년 시공기술과<br />
                    전문 노하우를 접목한 1:1 고객 맞춤 마루 전문 케어 입니다.
                </p>
            </div>
        </section>

        <section class="w-full bg-white flex flex-col">
            <div class="max-w-[1280px] w-full flex flex-col self-center relative">
                <span
                    class="mt-[48px] lg:mt-[107px] mr-[20px] lg:mr-[125px] text-[11px] leading-[15px] text-warmGray-600 self-end">
                    HOME <i class="las la-angle-right"></i>
                    스마트 마루 케어<i class="las la-angle-right"></i>
                    <span class="text-[#1A1A1A] font-bold"> 스마트 마루 케어 서비스</span>
                </span>
                <div
                    class="absolute bg-primary-400 h-[30px] w-[180px] md:w-[384px] lg:w-[543px] top-[137px] lg:top-[241px] right-0 flex items-center rounded-l-[15px]">
                    <p class="text-[11px] text-white ml-[18px] font-bold">SMART CARE SERVICE 01</p>
                </div>
                <div class="w-full flex flex-col lg:flex-row items-center mt-[156px] md:mt-[173px] lg:mt-[64px]">
                    <img src="/img/smartservice/smart_care_desc.png"
                        class="w-[319px] md:w-[512px] lg:ml-[127px] object-cover" />

                    <div class="mt-[53px] md:mt-[48px] lg:ml-[112px]">
                        <p
                            class="text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-black text-center lg:text-start font-bold break-keep">
                            스마트 케어 서비스란?
                        </p>
                        <p
                            class="text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] text-black text-center lg:text-start break-keep mt-[30px] md:mt-[25px]">
                            마루 상태 진단과 현장 특성에 부합하는 1:1 마루 컨설팅<br />
                            마루 보수에서 교체까지 스마트한 맞춤 케어로<br />
                            고객님의 공간을 더욱 쾌적하고, 아름답게 가꿔드립니다.<br />
                        </p>
                    </div>
                </div>

                <p
                    class="mt-[30px] mb-[70px] md:mt-[48px] text-[18px] leading-[24px] md:text-[24px] md:leading-[36px] text-black text-center font-bold break-keep mx-[25px]">
                    최고의 마루전문가가 제안드리는 구정마루의
                    마루 All In One 케어를 만나 보세요.
                </p>
            </div>
        </section>

        <section class="max-w-[1280px] w-full flex flex-col self-center relative">
            <div
                class="bg-primary-400 h-[30px] w-[180px] md:w-[384px] lg:w-[320px] flex items-center rounded-r-[15px] mt-[50px] lg:mt-[60px]">
                <p class="text-[11px] text-white mr-[18px] lg:mr-[55px] font-bold text-right w-full">SMART CARE SERVICE 02
                </p>
            </div>
            <div class="lg:px-[127px] w-full flex flex-col mt-[50px] lg:mt-[40px]">
                <p
                    class="text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-black text-center lg:text-start font-bold break-keep">
                    차별화 된 구정마루
                </p>
                <p
                    class="text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] text-black text-center lg:text-start break-keep mt-[30px] md:mt-[25px]">
                    구정마루가 제안하는 단계별 케어 시스템<br />
                    우리집에 적합한 케어를 확인하고 간편하게 신청하세요.
                </p>
                <div class="px-[15px] mt-[20px] lg:mt-[80px] relative">
                    <iframe :src="Common.getYoutubeUrl('s0G226uBY3g')" class="w-full h-[220px] md:h-[560px] "
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen />
                </div>
            </div>

            <div class="mt-[65px] md:mt-[55px] w-full">
                <img src="/img/smartservice/smart_care_desc2_sm.png" class="md:hidden w-full" />
                <img src="/img/smartservice/smart_care_desc2_md.png" class="hidden md:block lg:hidden w-full" />
                <img src="/img/smartservice/smart_care_desc2_lg.png" class="hidden lg:block w-full" />
            </div>
        </section>

        <section class="w-full flex flex-col">
            <div class="max-w-[1280px] w-full flex flex-col self-center relative">
                <div
                    class="bg-primary-400 h-[30px] w-[180px] md:w-[384px] lg:w-[320px] flex items-center lg:rounded-r-[15px] rounded-l-[15px] lg:rounded-l-[0px] mt-[50px] lg:mt-[60px] self-end lg:self-start">
                    <p class="text-[11px] text-white mr-[18px] lg:mr-[55px] font-bold text-right w-full">
                        SMART CARE SERVICE 03
                    </p>
                </div>
                <div class="lg:px-[127px] w-full flex flex-col mt-[50px] lg:mt-[40px]">
                    <p
                        class="text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-black text-center lg:text-start font-bold break-keep whitespace-pre-line">
                        스마트 케어 {{ SCREEN_WIDTH > 600 ? "" : "\n" }}
                        방문관리 안심케어 서비스 4단계
                    </p>
                    <p
                        class="text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] text-black text-center lg:text-start break-keep mt-[30px] md:mt-[25px] whitespace-pre-line">
                        총4단계로 진행되는 스마트 마루 케어 서비스<br />
                        각 부서의 긴밀한 협업을 통해 {{ SCREEN_WIDTH > 600 ? "" : "\n" }}
                        최종 사후처리까지 꼼꼼한 케어를 약속드립니다.
                    </p>

                    <div class="mt-[50px] md:mt-[97px] lg:mt-[70px]">
                        <el-scrollbar class="pr-[3px] lg:pr-0 pb-[10px]" always>
                            <div class="flex flex-row items-center">
                                <div
                                    class="shrink-0 bg-[url('/img/smartservice/smart_care_step1.png')] hover:bg-[url('/img/smartservice/smart_care_step1_hover.png')] bg-cover w-[151px] md:w-[255px] h-[211px] md:h-[360px] mx-[3px] lg:mx-0">
                                </div>
                                <div
                                    class="shrink-0 bg-[url('/img/smartservice/smart_care_step2.png')] hover:bg-[url('/img/smartservice/smart_care_step2_hover.png')] bg-cover w-[151px] md:w-[255px] h-[211px] md:h-[360px] mx-[3px] lg:mx-0">
                                </div>
                                <div
                                    class="shrink-0 bg-[url('/img/smartservice/smart_care_step3.png')] hover:bg-[url('/img/smartservice/smart_care_step3_hover.png')] bg-cover w-[151px] md:w-[255px] h-[211px] md:h-[360px] mx-[3px] lg:mx-0">
                                </div>
                                <div
                                    class="shrink-0 bg-[url('/img/smartservice/smart_care_step4.png')] hover:bg-[url('/img/smartservice/smart_care_step4_hover.png')] bg-cover w-[151px] md:w-[255px] h-[211px] md:h-[360px] mx-[3px] lg:mx-0">
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="mt-[38px] md:mt-[55px] lg:mt-[72px] relative">
                <img src="/img/smartservice/smart_care_question_bg.png" class="w-full h-[400px] object-cover" />
                <div class="absolute left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center">
                    <p
                        class="text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-white text-center lg:text-start font-bold break-keep whitespace-pre-line">
                        문의사항은 아래를 확인해주세요.
                    </p>
                    <p
                        class="text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] text-white text-center break-keep mt-[30px] md:mt-[25px] whitespace-pre-line">
                        스마트 케어 서비스는 구정마루 공식 대리점과<br />
                        본사 온라인 신청을 통해 상담 가능합니다.
                    </p>
                    <button
                        class="text-[15px] text-white w-[320px] md:w-[512px] lg:w-[340px] h-[54px] border border-white mt-[50px] md:mt-[20px] lg:mt-[45px]"
                        @click="() => { navigateTo('/smartservice/smart-care-request') }">
                        홈페이지에서 신청하기
                    </button>
                </div>
            </div>
        </section>

    </div>
</template>

<style lang="scss"></style>