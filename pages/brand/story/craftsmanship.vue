<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';
import { Common } from '~/ts/_utils/common';
import { SCREEN_WIDTH } from '~~/ts/constants';

// meta
definePageMeta({
    layout: 'page',
    title: '제조의 장인'
})

onMounted(() => {

    // carousel이 타 화면에 갔다오면 동작하지 않는것에 대한 해결책
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);
})

const slide_list1 = [
    {
        img: '/img/brand/story/process1.png',
    },
    {
        img: '/img/brand/story/process2.png',
    },
    {
        img: '/img/brand/story/process3.png',
    },
    {
        img: '/img/brand/story/process4.png',
    },
    {
        img: '/img/brand/story/process5.png',
    },
]

const slide_list2 = [
    {
        img: '/img/brand/story/process6.png',
    },
    {
        img: '/img/brand/story/process7.png',
    },
    {
        img: '/img/brand/story/process8.png',
    },
    {
        img: '/img/brand/story/process9.png',
    },
    {
        img: '/img/brand/story/process10.png',
    },
]


</script>
<template>
    <div class="pt-[55px] md:pt-[80px] lg:md:pt-[126px]">
        <section class="relative">
            <iframe :src="Common.getYoutubeUrl('tRu0n0Q4MY0', true, true, 0)" class="w-full h-[320px] md:h-[680px]"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen />
            <div class="rs-fullvideo-cover"></div>
        </section>
        <section class="w-full relative">
            <img :src="'/img/brand/story/브랜드페이지_제조의달인bg_01.png'" alt="브랜드페이지_제조의달인"
                class="w-full h-[640px] md:h-[854px] object-fill" />

            <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold" data-aos="slide-up"
                    data-aos-duration="1500" data-aos-delay='500'>​목재 제조의 장인</p>
                <p class="mt-[100px] text-[13px] md:text-[18px] text-white text-center px-[32px] break-keep hidden md:flex"
                    data-aos="fade-in" data-aos-duration="2500" data-aos-delay='500'>
                    대한민국 최고의 마루 제조회사라는 자부심으로<br />
                    타사가 흉내낼 수 없는 목재선별, 접착, 코팅, 가공 노하우와<br />
                    모방이 불가능한 최정상 임업 기술로 마루를 제조하고 있습니다.
                </p>
                <p class="mt-[100px] text-[13px] md:text-[18px] text-white text-center px-[32px] break-keep flex md:hidden"
                    data-aos="fade-in" data-aos-duration="2500" data-aos-delay='500'>
                    대한민국 최고의 마루 제조회사라는 자부심으로<br />
                    타사가 흉내낼 수 없는 목재선별, 접착, 코팅,<br />
                    가공 노하우와 모방이 불가능한 최정상 임업 기술로<br />
                    마루를 제조하고 있습니다.
                </p>
                <p class="mt-[50px] md:mt-[100px] text-[13px] md:text-[18px] text-white text-center px-[20px]"
                    data-aos="fade-in" data-aos-duration="2500" data-aos-delay='500'>
                    필름 접착 특수합판 강마루,<br />
                    천연 무늬 목재 코팅마루 그리고 한국산 원목마루까지<br />
                    대한민국에서 유일하게 모든 마루 제품을 취급하는<br />
                    마루 전문 제조기업으로 각인되어 있습니다.
                </p>
            </div>
        </section>

        <section class="px-[20px] py-[210px] md:py-[300px] flex flex-col justify-center">
            <p data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300"
                class="text-[22px] md:text-[30px] lg:text-[34px] text-center text-black font-bold whitespace-pre-line">
                올곧게 걸어온 한 길,<br />
                당신이 머무르는{{ SCREEN_WIDTH > 768 ? "" : "\n" }} 공간의 가치가 되다.
            </p>
            <p data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300"
                class="text-[13px] md:text-[15px] lg:text-[18px] text-center text-black mt-[60px] hidden md:block">
                구정마루는 마루 한 가지만 생각하고 집중하는 마루 전문 브랜드입니다.<br />
                대한민국 최고의 마루 제조회사라는 자부심으로<br />
                타사가 흉내낼 수 없는 목재선별, 접착, 코팅, 가공 노하우와<br />
                모방이 불가능한 최정상 임업 기술로 마루를 제조하고 있습니다.<br />
            </p>
            <p data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300"
                class="text-[13px] md:text-[15px] lg:text-[18px] text-center text-black mt-[60px] block md:hidden">
                구정마루는 마루 한 가지만 생각하고 집중하는<br />
                마루 전문 브랜드입니다.<br />
                대한민국 최고의 마루 제조회사라는 자부심으로<br />
                타사가 흉내낼 수 없는 목재선별, 접착, 코팅,<br />
                가공 노하우와 모방이 불가능한 최정상 임업 기술로<br />
                마루를 제조하고 있습니다.
            </p>
        </section>

        <section class="flex bg-[#FFFEF2] flex-col items-center relative">
            <img :src="'/img/brand/story/브랜드페이지_제조의달인bg_02.png'" alt="브랜드페이지_제조의달인"
                class="w-full h-[800px] md:h-[1200px] lg:h-[1400px] object-fill" />

            <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <div class="text-black text-center flex flex-col">
                    <p data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300"
                        class="text-[22px] md:text-[30px] lg:text-[34px] font-bold  ">
                        구정마루의 제품 생산 공정은<br />
                        길고 복잡하며, 꼼꼼합니다.</p>
                    <p data-aos="fade-in" data-aos-duration="1000" data-aos-delay="1200"
                        class="text-[13px] md:text-[15px] lg:text-[18px] mt-[60px] hidden md:block">
                        많은 기업이 생산 효율성을 강조하여 대량 생산에 집중하지만<br />
                        구정마루는 정반대의 길을 걸어왔습니다.<br />
                        마루 한 가지에 집중해 마루 전문 생산, 바닥 환경 연구, 시공 디테일에 집중합니다.<br />
                        이것은 최상의 마루와 앞선 디자인을 선보이기 위한 우리의 고집이며<br />
                        구정마루가 나아가야 할 목표이자 비전입니다.
                    </p>
                    <p data-aos="fade-in" data-aos-duration="1000" data-aos-delay="1200"
                        class="text-[13px] md:text-[15px] lg:text-[18px] mt-[60px] block md:hidden">
                        많은 기업이 생산 효율성을 강조하여<br />
                        대량 생산에 집중하지만 구정마루는 정반대의<br />
                        길을 걸어왔습니다. 마루 한 가지에 집중해<br />
                        마루 전문 생산, 바닥 환경 연구,<br />
                        시공 디테일에 집중합니다. 이것은 최상의 마루와<br />
                        앞선 디자인을 선보이기 위한 우리의 고집이며<br />
                        구정마루가 나아가야 할 목표이자 비전입니다.
                    </p>
                </div>

                <div class="w-full max-w-[1024px] mt-[76px] md:mt-[144px] ml-[-100px] lg:ml-[-200px]">
                    <Carousel :itemsToShow="2.5" :wrapAround="true" snapAlign="start" dir="rtl" :autoplay="2000">
                        <Slide v-for="(item, index) in slide_list1" :key="index">
                            <img :src="item.img" class="h-[120px] md:h-[200px] lg:h-[300px]" />
                        </Slide>
                    </Carousel>
                </div>

                <div class="w-full max-w-[1024px] mt-[20px] md:mt-[40px] ml-[160px] lg:ml-[400px]">
                    <Carousel :itemsToShow="2.5" :wrapAround="true" snapAlign="start" :autoplay="2000">
                        <Slide v-for="(item, index) in slide_list2" :key="index">
                            <img :src="item.img" class="h-[120px] md:h-[200px] lg:h-[300px]" />
                        </Slide>
                    </Carousel>
                </div>
            </div>
        </section>

        <section class="w-full relative">
            <img :src="'/img/brand/story/브랜드스토리_영상편집 1.png'" alt="브랜드스토리_영상편집"
                class="w-full h-[640px] md:h-[854px] object-cover" />

            <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold" data-aos="slide-up"
                    data-aos-duration="1500" data-aos-delay='500'>품질 제일 주의</p>
                <p class="mt-[50px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[32px] break-keep"
                    data-aos="fade-in" data-aos-duration="2500" data-aos-delay='500'>
                    목재 마이스터들의 깐깐한 검수 시스템으로<br />
                    고품질 마루 생산에 집중합니다.<br />
                    엄격한 기준을 거쳐 기술 장인의 호칭을 획득한<br />
                    전문 인력만이 생산 시스템을 운영합니다.<br />
                </p>
                <p class="mt-[30px] md:mt-[60px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[20px]"
                    data-aos="fade-in" data-aos-duration="2500" data-aos-delay='500'>
                    구정마루 본사 및 협력사 모든 생산 설비는<br />
                    구정마루 전용 생산라인 원칙을 고수합니다.
                </p>
            </div>
        </section>

        <section class="h-[640px] md:h-[854px] flex flex-col items-center justify-center">
            <p
                class="text-[22px] md:text-[30px] lg:text-[34px] text-black text-center font-bold break-keep px-[20px] whitespace-pre-line">
                목재 가공 엔지니어 {{ SCREEN_WIDTH > 768 ? "" : "\n" }}육성 및 평가 프로그램
            </p>
            <p
                class="text-[13px] md:text-[15px] lg:text-[18px] text-black text-break-keep px-[20px] text-center mt-[18px] md:mt-[50px] hidden md:block">
                목재 가공 엔지니어 육성을 위한 체계적인 교육 및<br />
                숙련도에 따른 평가 프로그램을 운영합니다.
            </p>
            <p
                class="text-[13px] md:text-[15px] lg:text-[18px] text-black text-break-keep px-[20px] text-center mt-[18px] md:mt-[50px] block md:hidden">
                목재 가공 엔지니어 육성을 위한<br />
                체계적인 교육 및 숙련도에 따른<br />
                평가 프로그램을 운영합니다.
            </p>
            <div class="flex flex-row px-[12px] items-center mt-[90px] md:mt-[95px] lg:mt-[58px] max-w-[1024px]">
                <div
                    class="relative w-[100px] md:w-[160px] lg:w-[250px] h-[100px] md:h-[160px] lg:h-[250px] rounded-[50%] bg-warmGray-800 text-[white] justify-center items-center flex flex-col z-10">
                    <p
                        class="absolute top-[5px] md:top-[8px] lg:top-[15px] text-[13px] md:text-[15px] lg:text-[18px] text-white">
                        1.
                    </p>
                    <p class="text-[15px] md:text-[18px] lg:text-[24px] text-center mt-[12px]">
                        목재기술
                    </p>
                    <div class="px-[10px] lg:px-[15px] w-full absolute">
                        <div class="border-white border-b-[1px] w-full" />
                    </div>
                    <p class="text-[18px] md:text-[24px] lg:text-[34px] font-bold mt-[20px]">
                        장인 3년
                    </p>
                </div>
                <img :src="'/img/icons/ic_arrow_long.png'" alt="arrow long"
                    class="w-[40px] md:w-[66px] lg:w-[104px] h-[30px] md:h-[50px] lg:h-[78px] ml-[-20px] md:ml-[-10px] lg:ml-[-30px] object-fill mr-[8px] md:mr-[20px]" />
                <div class="flex-1" />
                <div
                    class="relative w-[100px] md:w-[160px] lg:w-[250px] h-[100px] md:h-[160px] lg:h-[250px] rounded-[50%] bg-warmGray-800 text-[white] justify-center items-center flex flex-col z-10">
                    <p
                        class="absolute top-[5px] md:top-[8px] lg:top-[15px] text-[13px] md:text-[15px] lg:text-[18px] text-white">
                        2.
                    </p>
                    <p class="text-[15px] md:text-[18px] lg:text-[24px] text-center mt-[12px]">
                        목재기술
                    </p>
                    <div class="px-[10px] lg:px-[15px] w-full absolute">
                        <div class="border-white border-b-[1px] w-full" />
                    </div>
                    <p class="text-[18px] md:text-[24px] lg:text-[34px] font-bold mt-[20px]">
                        명인 5년
                    </p>
                </div>
                <img :src="'/img/icons/ic_arrow_long.png'" alt="arrow long"
                    class="w-[40px] md:w-[66px] lg:w-[104px] h-[30px] md:h-[50px] lg:h-[78px] ml-[-20px] md:ml-[-10px] lg:ml-[-30px] object-fill mr-[8px] md:mr-[20px]" />
                <div class="flex-1" />
                <div
                    class="relative w-[100px] md:w-[160px] lg:w-[250px] h-[100px] md:h-[160px] lg:h-[250px] rounded-[50%] bg-warmGray-800 text-[white] justify-center items-center flex flex-col z-10">
                    <p
                        class="absolute top-[5px] md:top-[8px] lg:top-[15px] text-[13px] md:text-[15px] lg:text-[18px] text-white">
                        3.
                    </p>
                    <p class="text-[15px] md:text-[18px] lg:text-[24px] text-center mt-[12px]">
                        목재기술
                    </p>
                    <div class="px-[10px] lg:px-[15px] w-full absolute">
                        <div class="border-white border-b-[1px] w-full" />
                    </div>
                    <p class="text-[18px] md:text-[24px] lg:text-[34px] font-bold mt-[20px]">
                        명장 10년
                    </p>
                </div>
            </div>
            <p
                class="text-[13px] md:text-[18px] mt-[50px] lg:mt-[60px] text-white text-center break-keep px-[20px] md:px-[100px] py-[5px] mx-[10px] bg-warmGray-800 whitespace-pre-line">
                구정마루의 특별한 품질 검증 절차는 고객님에게 {{ SCREEN_WIDTH > 768 ? "" : "\n" }}
                특별한 프리미엄 마루를 드리기 위한 소중한 과정입니다.
            </p>
        </section>
    </div>
</template>

<style lang="scss"></style>