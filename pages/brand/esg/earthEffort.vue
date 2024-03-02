<script setup lang="ts">
// meta
definePageMeta({
    layout: 'page',
    title: '지구를 위한 노력'
})

onMounted(() => {

    // carousel이 타 화면에 갔다오면 동작하지 않는것에 대한 해결책
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);
})

</script>
<template>
    <div class="pt-[55px] md:pt-[80px] lg:md:pt-[126px]">
        <section class="w-full relative">
            <img :src="'/img/brand/esg/earth_effort_bg1.png'" class="w-full h-[1200px] md:h-[2000px] object-fill" />

            <div class="absolute top-0 right-0 bottom-[100px] left-0 flex flex-col justify-center items-center">
                <p class="text-[22px] md:text-[34px] text-white font-bold text-center">
                    지속 가능한 미래를 위한<br />
                    작은 발걸음
                </p>
                <div class="w-[1px] h-[150px] bg-[white] mt-[36px] lg:mt-[153px]" />
                <img :src="'/img/icons/ic_mouse_scroll.png'"
                    class="h-[55px] md:h-[80px] mt-[16px] lg:mt-[23px] twinlking" />
                <p data-aos="slide-up"
                    class="text-[18px] md:text-[24px] text-white font-bold text-center mt-[160px] md:mt-[266px]">
                    기후 위기 등 예측 불가의 시대에<br />
                    지속가능성은 글로벌 전반에<br />
                    중요한 화두가 되고 있습니다.
                </p>
                <p data-aos="slide-up"
                    class="text-[18px] md:text-[24px] text-white font-bold text-center mt-[85px] md:mt-[350px] hidden md:flex">
                    구정마루는 제품, 서비스의 혁신은 물론<br />
                    다양한 이해관계자들과 함께<br />
                    사회적 책임을 다하여 지구 환경과 미래 세대를 위하여<br />
                    더 나은 미래를 만들어 가고자 합니다.
                </p>
                <p data-aos="slide-up"
                    class="text-[18px] md:text-[24px] text-white font-bold text-center mt-[85px] md:mt-[160px] flex md:hidden">
                    구정마루는 제품, 서비스의 혁신은 물론<br />
                    다양한 이해관계자들과 함께<br />
                    사회적 책임을 다하여 지구 환경과<br />
                    미래 세대를 위하여<br />
                    더 나은 미래를 만들어 가고자 합니다.
                </p>
            </div>
        </section>

        <section class="flex flex-col">
            <div class="py-[45px] md:py-[120px] px-[10px] max-w-[360px] md:max-w-[740px]  flex flex-col self-center">
                <p class="text-[24px] md:text-[34px] font-bold">구정마루 ESG 등급</p>
                <div class="w-full h-[10px] mt-[15px] bg-black" />
                <div class="mt-[15px] flex flex-row items-center justify-between">
                    <p class="text-[11px] md:text-[18px]">
                        벤치마크 분포는 유사 규모 기업의 등급 분포도를 나타냅니다.<br />
                        ESG등급은 숫자가 낮을수록 높은 등급입니다.
                    </p>
                    <p class="text-[11px] md:text-[18px]">
                        단위 : %
                    </p>
                </div>
                <div class="relative mt-[50px]">
                    <img :src="'/img/brand/esg/esg_chart1.png'" class="w-full object-cover" />
                    <img :src="'/img/brand/esg/esg_level.png'"
                        class="zoom-in-zoom-out w-[100px] md:w-[150px] object-cover absolute top-[-10px] md:top-[50px] right-[26px] md:right-[90px]" />
                </div>
                <p class="text-[11px] md:text-[16px] mt-[43px] md:mt-[36px] md:font-bold self-center">
                    2022 목재 업종별 평균 ESG 등급 출처 : 이크레더블
                </p>
            </div>
        </section>

        <section class="w-full relative">
            <img :src="'/img/brand/esg/earth_effort_bg2.png'" class="w-full h-[640px] md:h-[854px] object-fill" />

            <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <p data-aos="fade-up" data-aos-duration="1500"
                    class="text-[22px] md:text-[34px] text-white font-bold text-center">
                    Environment
                </p>
                <p data-aos="fade-up" data-aos-duration="1500"
                    class="text-[22px] md:text-[34px] text-white font-bold text-center">
                    지구를 위한 노력
                </p>
                <p data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500"
                    class="text-[13px] md:text-[18px] text-white text-center mt-[50px] md:mt-[100px] hidden md:flex">
                    구정마루의 비즈니스 여정은<br />
                    위대한 자연의 유산, 나무에서 시작합니다.<br />
                    우리의 근간인 나무, 나아가 자연 환경의 보전을 위해 친환경 제품 개발은 물론<br />
                    제품 기획, 원료의 구매, 생산, 유통의 경영 전반의 관리,<br />
                    친환경 사업장 조성, 폐자재 활용을 통한 자원의 순환을 실천합니다.
                </p>
                <p data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500"
                    class="text-[13px] md:text-[18px] text-white text-center mt-[50px] md:mt-[100px] flex md:hidden">
                    구정마루의 비즈니스 여정은 위대한 자연의 유산,<br />
                    나무에서 시작합니다.<br />
                    우리의 근간인 나무, 나아가 자연 환경의 보전을 위해<br />
                    친환경 제품 개발은 물론<br />
                    제품 기획, 원료의 구매, 생산, 유통의 경영 전반의 관리,<br />
                    친환경 사업장 조성, 폐자재 활용을 통한<br />
                    자원의 순환을 실천합니다.
                </p>
            </div>
        </section>


        <section class="w-full relative">
            <img :src="'/img/brand/esg/earth_effort_bg3.png'" class="w-full h-[1000px] md:h-[854px] object-cover" />

            <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="">
                        <p data-aos="fade-up" data-aos-duration="1500"
                            class="text-[22px] md:text-[34px] text-white font-bold text-center">
                            친환경 제품 개발
                        </p>
                        <p data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500"
                            class="text-[13px] md:text-[18px] text-white text-center mt-[60px] hidden md:block">
                            전 세계 우수 산지로부터 깐깐하게 선별한<br />
                            친환경 최고등급(SE0)자재를 사용한<br />
                            제품 개발을 통해<br />
                            친환경 인증을 지속적으로 획득하여<br />
                            새집 증후군을 유발하는 포름알데히드를<br />
                            최소화하고 있습니다.
                        </p>
                        <p data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500"
                            class="text-[13px] text-white text-center mt-[50px] block md:hidden">
                            전 세계 우수 산지로부터 깐깐하게 선별한<br />
                            친환경 최고등급(SE0)자재를<br />
                            사용한 제품 개발을 통해<br />
                            친환경 인증을 지속적으로 획득하여<br />
                            새집 증후군을 유발하는 폼알데하이드를<br />
                            최소화하고 있습니다.
                        </p>
                    </div>
                    <div class="relative mt-[83px] md:mt-[0px] md:ml-[67px]">
                        <img :src="'/img/brand/esg/esg_chart2.png'" class="object-cover w-[360px] md:w-[430px]" />
                        <img :src="'/img/brand/esg/esg_level2.png'"
                            class="up-down w-[60px] md:w-[80px] object-cover absolute bottom-[100px] md:bottom-[120px] left-[16px] md:left-[15px]" />
                    </div>
                </div>
            </div>
        </section>

        <section class="w-full relative">
            <img :src="'/img/brand/esg/earth_effort_bg4.png'" class="w-full h-[1000px] md:h-[854px] object-cover" />

            <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="relative md:mr-[10px] lg:mr-[35px] hidden md:block">
                        <img :src="'/img/brand/esg/esg_chart4.png'" class="object-cover w-[404px]" />
                        <img :src="'/img/brand/esg/esg_level3.png'"
                            class="up-down w-[80px] object-cover absolute bottom-[120px] right-[35px]" />
                        <img data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000"
                            :src="'/img/brand/esg/esg_line1.png'"
                            class="w-[90px] object-cover absolute bottom-[140px] right-[160px]" />
                        <img data-aos="fade-right" data-aos-delay="500" data-aos-duration="1000"
                            :src="'/img/brand/esg/esg_line2.png'"
                            class="w-[95px] object-cover absolute bottom-[95px] right-[68px]" />
                    </div>
                    <div class="flex flex-col items-center">
                        <p data-aos="fade-up" data-aos-duration="1500"
                            class="text-[24px] md:text-[30px] text-white font-bold text-center">
                            탄소배출 저감
                        </p>
                        <p data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500"
                            class="text-[13px] md:text-[15px] text-white text-center mt-[50px]">
                            제품 생산 프로세스 개선, 전사 LED 사용 등<br />
                            에너지 절감 등의 노력을 통해<br />
                            매년 간접 온실가스 배출량을 절감하고 있습니다.
                        </p>
                        <div class="relative mt-[109px] block md:hidden">
                            <img :src="'/img/brand/esg/esg_chart4.png'" class="object-cover w-[356px]" />
                            <img data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000"
                                :src="'/img/brand/esg/esg_line1.png'"
                                class="w-[75px] object-cover absolute bottom-[124px] right-[140px]" />
                            <img data-aos="fade-right" data-aos-delay="500" data-aos-duration="1000"
                                :src="'/img/brand/esg/esg_line2.png'"
                                class="w-[85px] object-cover absolute bottom-[83px] right-[58px]" />
                            <img :src="'/img/brand/esg/esg_level3.png'"
                                class="up-down w-[60px] md:w-[100px] object-cover absolute bottom-[100px] right-[36px]" />
                        </div>
                        <img :src="'/img/brand/esg/esg_chart3.png'"
                            class="object-cover w-[320px] lg:w-[460px] mt-[27px] md:mt-[66px] lg:mt-[40px]" />
                    </div>
                </div>
            </div>
        </section>

        <section class="w-full relative">
            <img :src="'/img/brand/esg/earth_effort_bg5.png'" class="w-full h-[640px] md:h-[854px] object-cover" />

            <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <p data-aos="fade-up" data-aos-duration="1500"
                    class="text-[24px] md:text-[30px] lg:text-[34px] text-white font-bold text-center">
                    자원 순환
                </p>
                <p data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500"
                    class="text-[15px] md:text-[22px] text-white text-center mt-[38px] md:mt-[50px] hidden md:block">
                    구정마루는 FSC 인증 합판 사용 및 스마트케어을 통해<br />
                    폐기물 절감및 엄격한 자원 관리를 위해<br />
                    노력하고 있으며, 재활용 고체 원료 생산 위탁사를 통해 제품 생산 시<br />
                    발생하는 목분과 폐목재를 처리하여 자원 순환을 촉진하고 있습니다.
                </p>
                <p data-aos="fade-in" data-aos-delay="500" data-aos-duration="1500"
                    class="text-[15px] md:text-[22px] text-white text-center mt-[38px] md:mt-[50px] block md:hidden">
                    구정마루는 FSC 인증 합판 사용 및 스마트케어을 통해<br />
                    폐기물 절감및 엄격한 자원 관리를 위해<br />
                    노력하고 있으며, 재활용 고체 원료 생산 위탁사를 통해<br />
                    제품 생산 시 발생하는 목분과 폐목재를 처리하여<br />
                    자원 순환을 촉진하고 있습니다.
                </p>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
.twinlking {
    animation: twinlking 2s ease-out infinite;
}

@keyframes twinlking {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.zoom-in-zoom-out {
    animation: zoom-in-zoom-out 2s ease-out infinite;
}

@keyframes zoom-in-zoom-out {
    0% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.1, 1.1);
    }

    100% {
        transform: scale(1, 1);
    }
}

.up-down {
    animation: up-down 2s linear infinite;
}

@keyframes up-down {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}
</style>