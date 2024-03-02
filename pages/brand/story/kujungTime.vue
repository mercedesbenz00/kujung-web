<script setup lang="ts">
import { useStore } from '~/stores/common';
import { Common } from '~/ts/_utils/common';
import { SCREEN_WIDTH } from '~/ts/constants';

// meta
definePageMeta({
    layout: 'page',
    title: '구정 그리고 시간의가치'
})
const store = useStore()
const showPage = ref(false)

const fullPageOptions = {
    licenseKey: '0LD27-YY5M9-PKERI-YDXJK-NOLMK',
    responsiveWidth: 800,
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
            } else {
                el.classList.remove('aos-animate')
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

</script>

<template>
    <div>
        <full-page ref="fullpage" v-if="showPage" :options="fullPageOptions">
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="'/img/brand/story/kujung_time_bg1.png'" class="w-full h-screen object-cover" />
                    <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <p class="mt-[-100px] text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold"
                            data-aos="fade-in" data-aos-duration="1500" data-aos-delay='500'>‘The Artisan Spirits’</p>
                        <p class="mt-[50px] md:mt-[40px] text-[22px] md:text-[24px] text-white text-center px-[32px] break-keep whitespace-pre-line"
                            data-aos="fade-up" data-aos-duration="1500" data-aos-delay='500'>
                            1987년부터 이어져 온 {{ SCREEN_WIDTH > 768 ? "" : "\n" }}마루 전문 브랜드
                        </p>
                    </div>
                    <img :src="'/img/icons/ic_scroll_wheel.png'"
                        class="hidden md:flex absolute bottom-[141px] lg:bottom-[98px] w-[80px]" />
                </section>
            </div>
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="'/img/brand/story/kujung_time_bg2.png'" class="w-full h-screen object-cover" />
                    <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <p class="mt-[-150px] text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold"
                            data-aos="fade-in" data-aos-duration="1500" data-aos-delay='500'>俱 구 貞 정</p>
                        <p class="mt-[50px] md:mt-[40px] text-[22px] md:text-[24px] text-white text-center px-[32px] break-keep"
                            data-aos="fade-down" data-aos-duration="1500" data-aos-delay='500'>
                            함께 그리고 곧게
                        </p>
                    </div>
                    <img :src="'/img/icons/ic_scroll_wheel.png'"
                        class="hidden md:flex absolute bottom-[141px] lg:bottom-[98px] w-[80px]" />
                </section>
            </div>
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="'/img/brand/story/kujung_time_bg3.png'" class="w-full h-screen object-cover" />
                    <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <p class="mt-[-150px] text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold"
                            data-aos="fade-left" data-aos-duration="1500" data-aos-delay='500'>오직 마루 한 가지만 생각하고 집중하여</p>
                        <p class="mt-[50px] md:mt-[40px] text-[22px] md:text-[24px] text-white text-center px-[32px] break-keep"
                            data-aos="fade-right" data-aos-duration="1500" data-aos-delay='500'>
                            올곧게 걸어온 한 길
                        </p>
                    </div>
                    <img :src="'/img/icons/ic_scroll_wheel.png'"
                        class="hidden md:flex absolute bottom-[141px] lg:bottom-[98px] w-[80px]" />
                </section>
            </div>
            <div class="section">
                <section class="w-full h-screen relative flex justify-center">
                    <img :src="'/img/brand/story/kujung_time_bg4.png'" class="w-full h-screen object-cover" />
                    <div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                        <p class="mt-[-150px] text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold"
                            data-aos="flip-left" data-aos-duration="1500" data-aos-delay='100'>아이부터 어른까지 온 가족이 함께한</p>
                        <p class="mt-[50px] md:mt-[40px] text-[22px] md:text-[24px] text-white text-center px-[32px] break-keep whitespace-pre-line"
                            data-aos="flip-right" data-aos-duration="1500" data-aos-delay='500'>
                            당신이 머무르는 {{ SCREEN_WIDTH > 768 ? "" : "\n" }}공간의 가치가 되었습니다.
                        </p>
                    </div>
                    <img :src="'/img/icons/ic_scroll_wheel.png'"
                        class="hidden md:flex absolute bottom-[141px] lg:bottom-[98px] w-[80px]" />
                </section>
            </div>
            <div class="section fp-auto-height">
                <div class="">
                    <section class="h-[640px] md:h-[854px] items-center justify-center flex flex-col">
                        <p class="text-[22px] text-center font-bold text-black px-[20px] break-keep whitespace-pre-line" data-aos="fade-in">
                            "공간의 미학”<br />
                            구정마루는 공간의
                            아름다움을 {{ SCREEN_WIDTH > 768 ? "" : "\n" }}설계합니다.
                        </p>
                        <p class="mt-[70px] md:mt-[100px] text-[22px] text-center font-bold text-black px-[20px] break-keep whitespace-pre-line"
                            data-aos="fade-in" data-aos-duration="1000" data-aos-delay="500">
                            공유하고 싶은 공간의 경험<br />
                            우리가 꿈꾸고, {{ SCREEN_WIDTH > 768 ? "" : "\n" }}고객에게 드리고자 하는 것입니다.
                        </p>
                    </section>

                    <section class="relative">
                        <iframe :src="Common.getYoutubeUrl('CXsF3UaDWf4', true, true, 0)"
                            class="w-full h-[320px] md:h-[640px] lg:h-[800px]" title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen />
                        <div class="rs-fullvideo-cover"></div>
                    </section>

                    <section class="w-full h-screen relative flex justify-center">
                        <img :src="'/img/brand/story/kujung_time_bg5.png'" class="w-full h-screen object-cover" />
                        <div
                            class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center px-[24px] md:px-[60px] lg:px-[154px]">
                            <div id="lazy-aos" class="mt-[15px] md:mt-[46px] text-center" data-aos="fade-in"
                                data-aos-delay="100" data-aos-duration="1000">
                                <p class="text-[22px] md:text-[30px] lg:text-[34px] text-white font-bold">
                                    ‘디자인에 대한 집념’
                                </p>
                                <p class="mt-[60px] md:mt-[46px] text-[13px] md:text-[15px] lg:text-[18px] text-white whitespace-pre-line">
                                    고객이 꿈꾸는 공간 경험을 제공하기위한<br />
                                    우리의 노력은 디자인에 대한 집념으로 이어집니다.<br />
                                    구정마루는 인테리어 및 소비자 연구의 결과로 이어진<br />
                                    독보적인 컬러와 패턴으로 {{ SCREEN_WIDTH > 768 ? "" : "\n" }}업계 트렌드를 리딩하고 있습니다.
                                </p>
                                <p class="mt-[50px] text-[13px] md:text-[15px] lg:text-[18px] text-white">
                                    또한 마루 업계 최고의 디자인 스펙트럼을 자랑합니다.<br />
                                    헤링본, 쉐브론, 헥사곤 등의 패턴마루를 제안하며<br />
                                    250여가지의 마루디자인으로 그 다양성을 선보입니다.<br />
                                    마루회사로는 유일하게 커스터마이징 마루를 선보이며<br />
                                    업계 선두에서 시장을 리딩하고 있습니다.
                                </p>
                            </div>
                        </div>
                    </section>
                    <PageFooter class="hidden md:flex" />
                </div>
            </div>
        </full-page>
    </div>
</template>

<style lang="scss"></style>