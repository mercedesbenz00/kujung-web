<script setup lang="ts">
import { useStore } from '~/stores/common';
import { SCREEN_WIDTH } from '~/ts/constants';

// meta
definePageMeta({
    layout: 'page',
    title: '자연그대로의 아름다움'
})
const store = useStore()
const showPage = ref(false)


const fullPageOptions = {
    licenseKey: '0LD27-YY5M9-PKERI-YDXJK-NOLMK',
    responsiveWidth: 800,
    fadingEffect: true,
    scrollingSpeed: 1,
    afterLoad: (origin: any, destination: any) => {
        if (destination.index <= origin.index) {
            store.setshowNavbar(true)
        } else {
            store.setshowNavbar(false)
        }
        document.querySelectorAll('.fp-table.active .aos-init').forEach((el) => {
            if (el.getAttribute('id') == 'lazy-aos') {
                return
            }
            el.classList.add('aos-animate')
        })
    },
    onLeave: function () {
        document.querySelectorAll('.fp-table.active .aos-init').forEach((el) => {
            el.classList.remove('aos-animate')
        })
    },
    onScrollOverflow: function (section: any, slide: any, position: any, direction: any) {
        if (direction == "up") {
            store.setshowNavbar(true)
        } else {
            store.setshowNavbar(false)
        }
        document.querySelectorAll('#lazy-aos').forEach((el) => {
            if (isInViewport(el)) {
                el.classList.add('aos-animate')
            }
        })
    }
}
const isInViewport = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight) / 2 &&
        rect.left >= 0
    );
}

onMounted(() => {
    setTimeout(() => {
        showPage.value = true
    }, 1000);
})

const processList = [
    {
        title: "조림지 원목 선정",
        img: "/img/brand/story/nature_beauty/프로세스과정_01.png",
    },
    {
        title: "목재 운송",
        img: "/img/brand/story/nature_beauty/프로세스과정_02.png",
    },
    {
        title: "5겹 특수 합판 접착 공정",
        img: "/img/brand/story/nature_beauty/프로세스과정_03.png",
    },
    {
        title: "5겹 특수 합판 건조 및 숙성",
        img: "/img/brand/story/nature_beauty/프로세스과정_04.png",
    },
    {
        title: "컨테이너 해운 운송",
        img: "/img/brand/story/nature_beauty/프로세스과정_05.png",
    },
    {
        title: "원목 또는 HPL 접착",
        img: "/img/brand/story/nature_beauty/프로세스과정_06.png",
    },
    {
        title: "자재 압착 마감 공정",
        img: "/img/brand/story/nature_beauty/프로세스과정_07.png",
    },
    {
        title: "표면 특수처리 가공",
        img: "/img/brand/story/nature_beauty/프로세스과정_08.png",
    },
    {
        title: "테크니컬 T&G 가공",
        img: "/img/brand/story/nature_beauty/프로세스과정_09.png",
    },
    {
        title: "UV 특수 코팅 (20회)",
        img: "/img/brand/story/nature_beauty/프로세스과정_10.png",
    },
    {
        title: "품질 3차 정밀 검수",
        img: "/img/brand/story/nature_beauty/프로세스과정_11.png",
    },
    {
        title: "포장 및 마루 창고 보관",
        img: "/img/brand/story/nature_beauty/프로세스과정_12.png",
    },
]

</script>

<template>
    <div>
        <full-page ref="fullpage" v-if="showPage" :options="fullPageOptions">
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="'/img/brand/story/nature_beauty/nature_beauty_bg1.png'"
                        class="w-full h-screen object-cover" />
                    <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold" data-aos="fade-in"
                            data-aos-duration="1500" data-aos-delay='500'>Design by Nature</p>
                        <p class="mt-[10px] md:mt-[28px] lg:mt-[32px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[32px] break-keep"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            시간이 흘러도 변화하지 않는 자연의 소중함<br />
                            우리가 향유하는 자연의 아름다움
                        </p>
                    </div>
                </section>
            </div>
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="SCREEN_WIDTH > 1024 ? '/img/brand/story/nature_beauty/nature_beauty_bg1.png' : '/img/brand/story/nature_beauty/nature_beauty_bg1_2.png'"
                        class="w-full h-screen object-cover" />
                    <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <!-- <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold" data-aos="fade-in"
                            data-aos-duration="1500" data-aos-delay='500'>Design by Nature</p> -->
                        <p class="mt-[10px] md:mt-[28px] lg:mt-[32px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[32px] break-keep"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            ‘모든 것은 자연으로 돌아간다’는 가치를 토대로<br />
                            우리는 자연주의를 표방합니다.
                        </p>
                    </div>
                </section>
            </div>
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="SCREEN_WIDTH > 1024 ? '/img/brand/story/nature_beauty/nature_beauty_bg1.png' : '/img/brand/story/nature_beauty/nature_beauty_bg1_3.png'"
                        class="w-full h-screen object-cover" />
                    <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <!-- <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold" data-aos="fade-in"
                            data-aos-duration="1500" data-aos-delay='500'>Design by Nature</p> -->
                        <p class="mt-[10px] md:mt-[28px] lg:mt-[32px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[32px] break-keep"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            구정마루로 만들어지는 모든 제품에<br />
                            자연 그대로의 아름다움의 가치를<br />
                            고객에게 온전히 전달하기 위해<br />
                            원재료의 선별, 제조 공정,<br />
                            유통의 전 과정에서<br />
                            장인정신으로 임합니다.
                        </p>
                    </div>
                </section>
            </div>

            <div class="section fp-auto-height">
                <div class="">
                    <section class="h-screen flex flex-col items-center justify-center">
                        <p class="text-[22px] md:text-[30px] lg:text-[34px] text-center font-bold text-black px-[10px] break-keep"
                            data-aos="fade-up">
                            “자연 그대로의 아름다움을 담다”
                        </p>
                        <p class="mt-[30px] md:mt-[50px] text-[22px] md:text-[30px] lg:text-[34px] text-center font-bold text-black px-[60px] break-keep whitespace-pre-line"
                            data-aos="fade-up" data-aos-duration="1000">
                            구정마루의 출발점이 되는<br />
                            나무는 매우 민감한 {{ SCREEN_WIDTH > 768 ? "" : "\n" }}자연의 소재입니다.
                        </p>
                        <p class="mt-[54px] md:mt-[100px] text-[13px] md:text-[18px] text-center text-black px-[60px] break-keep hidden md:block"
                            data-aos="fade-in" data-aos-duration="2000" data-aos-delay="500">
                            민감한 자연의 소재를 다루기에 구정마루는 원자재의 가격을 넘어<br />
                            국내 온돌 환경이 열과 습기에 가장 안전한 특수 목재 합판, SE0의 제품들을 고수하며<br />
                            최고의 목자재를 얻기 위해 주기적으로 전 세계 유수 원산지를 방문하여<br />
                            품질을 체크하고 깐깐한 선별 과정을 거칩니다.<br />
                            이후 잘 숙련된 마루 장인의 손길에서 친환경 도료 및 접착제, 공정 기술을 통해<br />
                            자연의 아름다움의 가치를 담은 대한민국 4계절 환경에 최적화된 제품을 고객에게 선사합니다.
                        </p>
                        <p class="mt-[54px] md:mt-[100px] text-[13px] md:text-[18px] text-center text-black px-[10px] break-keep block md:hidden"
                            data-aos="fade-in" data-aos-duration="2000" data-aos-delay="500">
                            민감한 자연의 소재를 다루기에 구정마루는<br />
                            원자재의 가격을 넘어 국내 온돌 환경이 열과 습기에<br />
                            가장 안전한 특수 목재 합판, SE0의 제품들을 고수하며<br />
                            최고의 목자재를 얻기 위해 주기적으로<br />
                            전 세계 유수 원산지를 방문하여<br />
                            품질을 체크하고 깐깐한 선별 과정을 거칩니다.<br />
                            이후 잘 숙련된 마루 장인의 손길에서<br />
                            친환경 도료 및 접착제, 공정 기술을 통해<br />
                            자연의 아름다움의 가치를 담은<br />
                            대한민국 4계절 환경에 최적화된 제품을<br />
                            고객에게 선사합니다.
                        </p>
                    </section>
                </div>
            </div>

            <div class="section fp-auto-height">
                <div class="">
                    <section class="w-full relative flex justify-center">
                        <img :src="'/img/brand/story/nature_beauty/nature_beauty_bg2.png'"
                            class="w-full h-[900px] md:h-[1000px] object-cover" />
                        <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                            <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold whitespace-pre-line text-center"
                                data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>구정마루만의 친환경-{{ SCREEN_WIDTH
                                    > 768 ? "" : "\n" }}프리미엄 생산 공정</p>
                            <p class="mt-[90px] md:mt-[50px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[32px] break-keep hidden md:block"
                                data-aos="fade-in" data-aos-duration="1500" data-aos-delay='500'>
                                나무를 베이스로 한 마루는 원재료의 보관, 제조 환경, 완제품의 보관, 유통의<br />
                                프로세스에서 변형이 생길 수 있는 예민한 제품입니다.
                            </p>
                            <p class="mt-[90px] md:mt-[50px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[32px] break-keep block md:hidden"
                                data-aos="fade-in" data-aos-duration="1500" data-aos-delay='500'>
                                나무를 베이스로 한 마루는 원재료의 보관,<br />
                                제조 환경, 완제품의 보관,<br />
                                유통의 프로세스에서 변형이 생길 수 있는<br />
                                예민한 제품입니다.
                            </p>
                            <p class="mt-[50px] md:mt-[50px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[32px] break-keep hidden md:block"
                                data-aos="fade-in" data-aos-duration="1500" data-aos-delay='500'>
                                구정마루는 자연 그대로의 아름다움을 고객들에게 전달하기 위해<br />
                                약 20개월의 고유의 길고 꼼꼼한 생산 공정을<br />
                                고수하고 있으며, 전 생산 라인 직접 검수 시스템과<br />
                                마루 품질 평가사들의 끊임없는 연구를 통해 최고의 제품을 선보이고 있습니다.
                            </p>
                            <p class="mt-[50px] md:mt-[50px] text-[13px] md:text-[15px] lg:text-[18px] text-white text-center px-[32px] break-keep block md:hidden"
                                data-aos="fade-in" data-aos-duration="1500" data-aos-delay='500'>
                                구정마루는 자연 그대로의 아름다움을<br />
                                고객들에게 전달하기 위해<br />
                                약 20개월의 고유의 길고 꼼꼼한 생산 공정을<br />
                                고수하고 있으며, 전 생산 라인 직접 검수 시스템과<br />
                                마루 품질 평가사들의 끊임없는 연구를 통해<br />
                                최고의 제품을 선보이고 있습니다.
                            </p>
                        </div>
                    </section>

                    <div class="flex flex-col">
                        <p id="lazy-aos" class="text-[22px] md:text-[34px] text-black font-bold text-center mt-[90px]"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>22개월 간의 생산 프로세스 과정</p>
                        <p id="lazy-aos"
                            class="mt-[14px] md:mt-[9px] lg:mt-[25px] text-[15px] md:text-[18px] lg:text-[22px] px-[10px] text-center text-black break-keep font-bold"
                            data-aos="fade-in" data-aos-duration="1500" data-aos-delay='500'>구정마루가 22개월에 걸쳐 생산되는 프로세스입니다.
                        </p>
                        <p id="lazy-aos"
                            class="mt-[25px] md:mt-[12px] text-[11px] md:text-[15px] lg:text-[18px] text-black text-center px-[22px] break-keep"
                            data-aos="fade-in" data-aos-duration="1500" data-aos-delay='500'>
                            해당 이미지는 유사한 이미지로 각 공정의 실제 이미지가 아닙니다.
                        </p>
                        <div class="w-full max-w-[1024px] self-center mt-[50px]">
                            <div id="lazy-aos" data-aos="fade-up"
                                class="px-[8px] md:px-[20px] lg:px-[0px]  pb-[50px] md:pb-[28px] lg:pb-[64px] grid grid-cols-2 lg:grid-cols-3 gap-x-[8px] lg:gap-x-[10px] gap-y-[50px] md:gap-y-[28px] lg:gap-y-[64px]">
                                <div v-for="(slide, index) in processList.slice(0, 6)" :key="index"
                                    class="flex justify-center">
                                    <CardBrandProcess :index="index + 1" :processImg="slide.img" :title="slide.title" />
                                </div>
                            </div>
                            <div id="lazy-aos" data-aos="fade-up"
                                class="px-[8px] md:px-[20px] lg:px-[0px]  pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-2 lg:grid-cols-3 gap-x-[8px] lg:gap-x-[10px] gap-y-[50px] md:gap-y-[28px] lg:gap-y-[64px]">
                                <div v-for="(slide, index) in processList.slice(6, 12)" :key="index"
                                    class="flex justify-center">
                                    <CardBrandProcess :index="index + 7" :processImg="slide.img" :title="slide.title" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <PageFooter class="hidden md:flex" />
                </div>
            </div>
        </full-page>
    </div>
</template>

<style lang="scss"></style>