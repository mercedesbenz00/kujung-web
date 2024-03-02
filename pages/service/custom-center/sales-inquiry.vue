<script setup lang="ts">

// meta
definePageMeta({
    layout: 'page',
    title: '특판 문의하기'
})

onMounted(() => {
})

</script>

<template>
    <div class="flex flex-col pt-[55px] md:pt-[80px] lg:md:pt-[126px]">
        <div class="w-full flex relative">
            <img src="/img/service/sales_inquiry_banner.png" class="w-full h-[400px] md:h-[600px] object-cover" />
            <div
                class="absolute left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center pt-[50px] md:pt-[100px]">
                <p class="text-[24px] leading-[36px] md:text-[34px] text-white font-bold">
                    특판 문의하기
                </p>
                <p
                    class="mx-[30px] text-center text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-white mt-[26px] md:mt-[48px] lg:mt-[37px] break-keep">
                    자연을 품은 구정마루는 특별한 가치를 부여합니다.
                </p>
            </div>
        </div>

        <div class="w-full flex flex-col md:max-w-[727px] lg:max-w-[1024px] px-[20px] md:px-0 self-center">
            <div class="w-full flex flex-col self-center relative">
                <span class="mt-[48px] lg:mt-[107px] text-[11px] leading-[15px] text-warmGray-600 self-end">
                    HOME <i class="las la-angle-right"></i>
                    서비스<i class="las la-angle-right"></i>
                    고객센터<i class="las la-angle-right"></i>
                    <span class="text-[#1A1A1A] font-bold"> 특판 문의하기</span>
                </span>
            </div>

            <section class="mt-[59px] md:mt-[110px] lg:mt-[89px] w-full pb-[50px] md:pb-[60px] lg:pb-[104px]">
                <p
                    class="text-[22px] leading-[30px] md:text-[34px] md:leading-[44px] text-black text-center font-bold break-keep px-[20px] whitespace-pre-line">
                    구정마루 특판 문의하기
                </p>
                <p
                    class="mt-[33px] text-[11px] md:text-[15px] leading-[18px] md:leading-[24px] text-center whitespace-pre-line break-keep">
                    자연을 품은 구정마루는 많은 사람들과 함께 하고 있습니다.<br />
                    특판에 대한 제안 및 문의는 해당 이메일 주소로 부탁드립니다.<br />
                    특판 문의 : <b>btb@kujungmaru.com</b>
                </p>
            </section>
            <Line />

            <section class="w-full flex flex-col items-center justify-center pt-[52px]">
                <div class="flex flex-col lg:flex-1">
                    <p
                        class="text-[22px] leading-[30px] md:text-[24px] md:leading-[36px] text-[#135180] text-center font-bold break-keep">
                        구정마루와 함께하는 건설사
                    </p>
                    <p class="mt-[50px] text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] text-black text-center">
                        전국 주요 프로젝트 진행 中
                    </p>
                    <img src="/img/service/sales_inquiry_companies.png"
                        class="w-full md:w-[680px] lg:w-[920px] mt-[50px] md:mt-[73px] lg:mt-[100px]" />
                </div>
            </section>
        </div>

        <img src="/img/service/sales_inquiry_bottom_banner.png"
            class="w-full mt-[33px] md:mt-[23px] lg:mt-0" />
    </div>
</template>

<style lang="scss"></style>