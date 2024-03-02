<script setup lang="ts">
import { SCREEN_WIDTH } from '~~/ts/constants';

// meta
definePageMeta({
    layout: 'page',
    title: '우리의 공헌'
})

onMounted(() => {
})

const pageType = ref("social")

</script>
<template>
    <div class="flex flex-col items-center">
        <section class="w-full relative">
            <img :src="'/img/brand/esg/esg_social_bg1.png'" class="w-full h-[680px] object-cover" />

            <div class="absolute top-0 right-0 bottom-[0] left-0 flex flex-col justify-center items-center">
                <p class="text-[22px] md:text-[34px] text-white font-bold text-center">
                    SOCIAL
                </p>
                <p class="text-[22px] md:text-[34px] text-white font-bold text-center mt-[10px] md:mt-[20px]">
                    우리의 공헌
                </p>

                <p data-aos="slide-up" class="text-[18px] text-white text-center mt-[80px] md:mt-[50px]">
                    구정마루는 건강한 지역사회를 만들기 위한<br />
                    다양한 프로그램을 추진하고 있습니다.
                </p>
            </div>
        </section>

        <section
            class="mt-[122px] md:mt-[100px] lg:mt-[190px] flex flex-row items-center justify-center w-[360px] md:w-[730px]">
            <BtnSecondary class="flex-1" text="사회로의 환원" :selected="pageType == 'social'"
                :onClick="() => pageType = 'social'" />
            <BtnSecondary class="flex-1" text="교육" :selected="pageType != 'social'"
                :onClick="() => pageType = 'education'" />
        </section>

        <section v-if="pageType == 'social'" class="mt-[112px] lg:mt-[150px] w-full flex flex-col items-center">
            <p data-aos="fade-up" class="text-[24px] md:text-[30px] text-center text-black font-bold">
                사회로의 환원 (사회공헌,교육)
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[50px] lg:mt-[100px] text-[24px] md:text-[30px] text-center text-black hidden md:block">
                지역사회에 선한 영향력을 끼치기 위해 구정마루는 항상 노력하고 있습니다.<br />
                우리가 사는 지구 환경을 보호하고 사회 구성원들의 삶의 질을 높이며<br />
                지역사회와 공존하는 길을 찾는 활동으로 끊임없는 가치혁신을 추구하겠습니다.
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[50px] lg:mt-[100px] text-[15px] md:text-[18px] text-center text-black block md:hidden">
                지역사회에 선한 영향력을 끼치기 위해<br />
                구정마루는 항상 노력하고 있습니다.<br />
                우리가 사는 지구 환경을 보호하고<br />
                사회 구성원들의 삶의 질을 높이며<br />
                지역사회와 공존하는 길을 찾는 활동으로<br />
                끊임없는 가치혁신을 추구하겠습니다.
            </p>
            <img :src="SCREEN_WIDTH > 768 ? '/img/brand/esg/esg_social_bg2_md.png' : '/img/brand/esg/esg_social_bg2_sm.png'"
                class="w-full h-[200px] md:h-[250px] lg:h-[350px] mt-[50px] lg:mt-[150px] object-cover" />

            <p data-aos="fade-in" data-aos-duration="500"
                class="mt-[55px] md:mt-[100px] text-[22px] md:text-[30px] text-center text-black font-bold">
                사회환원 추진활동
            </p>

            <div class="flex justify-center mt-[50px] lg:mt-[100px]">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                    <img data-aos="fade-in" data-aos-duration="500" :src="'/img/brand/esg/esg_social_img1.png'"
                        class="w-[320px] h-[240px]" />
                    <img data-aos="fade-in" data-aos-duration="500" :src="'/img/brand/esg/esg_social_img2.png'"
                        class="w-[320px] h-[240px]" />
                </div>
            </div>

            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[60px] text-[22px] text-center text-black font-bold">
                지역사회 공존을 위한 첫걸음
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px]">
                구정마루는 투명한 경영과 함께하는 사회만들기를 위해 지역사회 공헌에 이바지하고 있습니다.<br />
                전국장애인체전 KPC하우스, 장애인 복지 시설 등의 지원을 통해 사회에 선한 영향력을 끼치고,<br />
                지역 사회 공존을 위해 노력하고자 합니다.
            </p>

            <Line class="mt-[60px] border-warmGray-600" />

            <img data-aos="fade-in" data-aos-duration="500" :src="'/img/brand/esg/esg_social_img3.png'"
                class="w-[320px] h-[240px] mt-[100px] md:mt-[60px]" />

            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[60px] text-[22px] text-center text-black font-bold">
                사회적 약자 포용을 위한 움직임
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px] hidden md:block">
                임직원의 자발적, 주도적 참여로 진행되는 기부캠페인은 지역 사회 나눔 문화 조성을 위한<br />
                구정마루의 움직임입니다. 사랑의 종신기부 운동본부 생골문화마을을 통해<br />
                소외계층 지원을 확대하고 희망나눔으로 지역 공생에 이바지하겠습니다.
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px] block md:hidden">
                임직원의 자발적, 주도적 참여로 진행되는 기부캠페인은<br />
                지역 사회 나눔 문화 조성을 위한<br />
                구정마루의 움직임입니다.<br />
                사랑의 종신기부 운동본부 생골문화마을을 통해<br />
                소외계층 지원을 확대하고 희망나눔으로<br />
                지역 공생에 이바지하겠습니다.
            </p>

            <Line class="mt-[60px] mb-[110px] border-warmGray-600" />

        </section>

        <section v-if="pageType != 'social'" class="mt-[112px] lg:mt-[150px] w-full flex flex-col items-center">
            <p data-aos="fade-up" class="text-[24px] md:text-[30px] text-center text-black font-bold">
                선한 영향력을 만들어 나가겠습니다
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[50px] lg:mt-[100px] text-[24px] md:text-[30px] text-center text-black hidden md:block">
                주기적인 마루, 인테리어 교육 아카데미의 운영으로<br />
                기업으로써의 사회공헌은 물론 인테리어 종사자의 역량을 강화하며<br />
                지역사회와의 공생관계 유지를 위해 노력하겠습니다.
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[50px] lg:mt-[100px] text-[15px] md:text-[18px] text-center text-black block md:hidden">
                주기적인 마루, 인테리어 교육 아카데미의 운영으로<br />
                기업으로써의 사회공헌은 물론<br />
                인테리어 종사자의 역량을 강화하며<br />
                지역사회와의 공생관계 유지를 위해 노력하겠습니다.
            </p>
            <img :src="SCREEN_WIDTH > 768 ? '/img/brand/esg/esg_edu_bg3_md.png' : '/img/brand/esg/esg_edu_bg3_sm.png'"
                class="w-full h-[200px] md:h-[250px] lg:h-[350px] mt-[50px] lg:mt-[150px] object-cover" />

            <p class="mt-[55px] md:mt-[100px] text-[22px] md:text-[30px] text-center text-black font-bold">
                사회 공헌과 지식 나눔
            </p>

            <img data-aos="fade-in" data-aos-duration="500" :src="'/img/brand/esg/esg_edu_img1.png'"
                class="w-[320px] h-[240px] mt-[100px] md:mt-[60px]" />
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[60px] text-[22px] text-center text-black font-bold">
                SD워커 아카데미 마루교육
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px] hidden md:block">
                구정마루는 기업으로써 실천과 책임을 다하는 것이 중요하다고 생각합니다.<br />
                그에 대한 실행으로 인테리어 지망생들을 위해 주기적인 마루 교육을 실시하고 있으며<br />
                현장 및 실무 중심의 교육으로 인재 양성 및 해당 분야 경쟁력 강화를 위해 노력하겠습니다.<br />
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px] block md:hidden">
                구정마루는 기업으로써 실천과 책임을 다하는 것이<br />
                중요하다고 생각합니다.<br />
                그에 대한 실행으로 인테리어 지망생들을 위해<br />
                주기적인 마루 교육을 실시하고 있으며<br />
                현장 및 실무 중심의 교육으로 인재 양성 및<br />
                해당 분야 경쟁력 강화를 위해 노력하겠습니다.
            </p>

            <Line class="mt-[60px] border-warmGray-600" />

            <img data-aos="fade-in" data-aos-duration="500" :src="'/img/brand/esg/esg_edu_img2.png'"
                class="w-[320px] h-[240px] mt-[100px] md:mt-[60px]" />
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[60px] text-[22px] text-center text-black font-bold">
                박목수의 열린 견적서 마루 교육
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px] hidden md:block">
                박목수의 열린 견적서는 인테리어 디자이너 대상의 전문교육 프로그램으로<br />
                구정마루가 약 35년이 넘도록 쌓아온 지식을 공유하는 기업-지역사회 공생을 위한<br />
                교육아카데미입니다. 지역사회 공존과 투명한 경영을 위하여 항상 노력하는<br />
                구정마루는 선한 영향력으로 지역문화 향상에 이바지하겠습니다.
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px] block md:hidden">
                박목수의 열린 견적서는 인테리어 디자이너 대상의<br />
                전문교육 프로그램으로 구정마루가 약 35년이 넘도록<br />
                쌓아온 지식을 공유하는 기업-지역사회 공생을 위한<br />
                교육아카데미입니다. 지역사회 공존과<br />
                투명한 경영을 위하여 항상 노력하는<br />
                구정마루는 선한 영향력으로 지역문화 향상에<br />
                이바지하겠습니다.
            </p>

            <Line class="mt-[60px] border-warmGray-600" />

            <img data-aos="fade-in" data-aos-duration="500" :src="'/img/brand/esg/esg_edu_img3.png'"
                class="w-[320px] h-[240px] mt-[100px] md:mt-[60px]" />
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[60px] text-[22px] text-center text-black font-bold">
                한성대 ICT 디자인 실내 인테리어 교육
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px] hidden md:block">
                구정마루는 기업과 학교간의 공생관계를 위해 산학협력교육을 진행하고 있습니다.<br />
                인테리어 관련 전공 학생들에게 기업의 노하우와 실무교육을 실행하며 가치나눔으로<br />
                공존의 길을 여는 배움의 장을 만들고 있습니다. 기업의 재능기부를 통해<br />
                지역사회 내 학교교육에 이바지하고 이는 투명 경영으로 연결된다고 생각합니다.
            </p>
            <p data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                class="mt-[20px] text-[15px] md:text-[18px] text-center text-black break-keep px-[20px] block md:hidden">
                구정마루는 기업과 학교간의 공생관계를 위해<br />
                산학협력교육을 진행하고 있습니다.<br />
                인테리어 관련 전공 학생들에게 기업의 노하우와<br />
                실무교육을 실행하며 가치나눔으로<br />
                공존의 길을 여는 배움의 장을 만들고 있습니다.<br />
                기업의 재능기부를 통해 지역사회 내 학교교육에<br />
                이바지하고 이는 투명 경영으로 연결된다고 생각합니다.
            </p>

            <Line class="mt-[60px] mb-[110px] border-warmGray-600" />

        </section>

    </div>
</template>

<style lang="scss"></style>