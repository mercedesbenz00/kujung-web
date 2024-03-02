<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { GoogleMap, Marker } from "vue3-google-map";
import { Common } from "~/ts/_utils/common";
import { api } from "~/ts/api";
import ModalImage from "~~/components/ModalImage.vue";
import { ShowRoomBanner } from '~~/ts/interfaces/ShowRoomBanner';
import { useStore } from '~/stores/common';
const store = useStore()

const route = useRoute();

const list = ref<ShowRoomBanner | null>(null)
// meta
definePageMeta({
    layout: 'page',
    title: '본사 쇼룸 찾아오시는 길'
});

const COMPANY_POSITION = { lat: 37.288143, lng: 127.339644 }

onMounted(() => {
    loadBannerList()
})

const onShowBanner = (p_item: ShowRoomBanner) => {
    const m = useModal({
        component: ModalImage,
        attrs: {
            title: '',
            onConfirm() {
                store.setCurModalIndicator(null)
        m.close()
            },
        },
        slots: {
            default: `<img src="${p_item.image_url}" class="w-full max-w-[360px] md:max-w-[726px] aspect-[1]" />`,
        },
    })
      store.setCurModalIndicator(m)
  m.open()
}

const loadBannerList = () => {
    api.get(`/homepage/showroom-banner?enabled=true`)
        .then(response => {
            list.value = response.data.items
        })
}

const onKakaoNavi = () => {
    if (Common.isMobile()) {
        window.open("https://kakaonavi.kakao.com/launch/index.do?appkey=69e54bff07f53269a7331d80087499a5&apiver=1.0&extras=%7B%22KA%22%3A%22sdk%2F1.43.1%20os%2Fjavascript%20sdk_type%2Fjavascript%20lang%2Fen-US%20device%2FLinux_armv81%20origin%2Fhttp%253A%252F%252Fwww.kujungmaru.co.kr%22%7D&param=%7B%22destination%22%3A%7B%22name%22%3A%22%EA%B5%AC%EC%A0%95%EB%A7%88%EB%A3%A8%22%2C%22x%22%3A127.334638%2C%22y%22%3A37.288325%7D%2C%22option%22%3A%7B%22coord_type%22%3A%22wgs84%22%2C%22vehicle_type%22%3A1%2C%22rpoption%22%3A100%2C%22route_info%22%3Afalse%7D%7D", '_blank', 'noreferrer');
    } else {
        Common.showInfoToast("안드로이드 및 ios기반의 모바일 환경에서 이용해주세요.")
    }
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                본사 쇼룸 찾아오시는 길
            </p>
            <p
                class="hidden md:block text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루는 언제 어디서나 당신 곁에 있습니다.
            </p>
            <p
                class="block md:hidden text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루는 언제 어디서나 당신 곁에 있습니다.
            </p>

            <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px]" />

            <section class="w-full grid mt-[20px] md:grid-cols-2 lg:grid-cols-4 md:mt-[40px] lg:mt-[50px] gap-[8px]">
                <a target="_blank" href="http://naver.me/GlNtDB0A">
                    <button type="button" class="bg-black text-white text-[15px] h-[54px] w-full" @click="">네이버 지도로
                        열기</button>
                </a>
                <a target="_blank" href="http://dmaps.kr/bvagb">
                    <button type="button" class="bg-black text-white text-[15px] h-[54px] w-full" @click="">다음 지도로
                        열기</button>
                </a>
                <a target="_blank" href="https://surl.tmap.co.kr/fc10310d">
                    <button type="button" class="bg-black text-white text-[15px] h-[54px] w-full" @click="">T맵으로 열기</button>
                </a>
                <button type="button" class="bg-black text-white text-[15px] h-[54px] w-full" @click="onKakaoNavi">카카오네비로
                    열기</button>
            </section>

            <section class="w-full flex flex-col mt-[40px] md:mt-[68px] lg:mt-[50px]">
                <div class="flex flex-row">
                    <div class="flex flex-col flex-1">
                        <p class="text-[22px] md:text-[24px] leading-[30px] md:leading-[36px] font-bold">찾아오시는 길</p>
                        <Line />
                        <p class="text-[18px] leading-[24px] mt-[24px]">신주소 : 경기 광주시 도척면 마도로 178-13</p>
                        <p class="text-[18px] leading-[24px] mt-[11px]">구주소 : 경기 광주시 도척면 유정리 100-5</p>
                        <p class="text-[18px] leading-[24px] mt-[11px]">지하철 : 경강선 “곤지암역”에서 차로 10분 거리 위치</p>
                    </div>
                    <div class="flex-1 hidden lg:flex">
                        <div class="flex flex-col flex-1">
                            <p class="text-[22px] md:text-[24px] leading-[30px] md:leading-[36px] font-bold">운영시간</p>
                            <Line />
                            <p class="text-[18px] leading-[24px] mt-[24px]">월~토 : 10:00 ~ 17:00</p>
                            <p class="text-[18px] leading-[24px] mt-[11px]">일요일 / 공휴일 : 휴무</p>
                        </div>
                        <div class="flex flex-col flex-1">
                            <p class="text-[22px] md:text-[24px] leading-[30px] md:leading-[36px] font-bold">대표번호</p>
                            <Line />
                            <p class="text-[18px] leading-[24px] mt-[24px]">031-766-0700</p>
                        </div>
                    </div>
                </div>
                <GoogleMap api-key="AIzaSyAo4EXRmULnR632cOcetYqVo_amWrs3k6M"
                    class="w-full h-[320px] md:h-[400px] mt-[30px] md:mt-[35px] lg:mt-[48px]" :zoom="15"
                    :center="COMPANY_POSITION">
                    <Marker :options="{ position: COMPANY_POSITION }">
                    </Marker>
                </GoogleMap>
                <!-- 모바일용 운영시간과 대표번호 현시부분 -->
                <div class="flex lg:hidden flex-col md:flex-row mt-[36px]">
                    <div class="flex flex-col flex-1">
                        <p class="text-[22px] md:text-[24px] leading-[30px] md:leading-[36px] font-bold">운영시간</p>
                        <Line />
                        <p class="text-[18px] leading-[24px] mt-[24px]">월~토 : 10:00 ~ 17:00</p>
                        <p class="text-[18px] leading-[24px] mt-[11px]">일요일 / 공휴일 : 휴무</p>
                    </div>
                    <div class="flex flex-col flex-1 mt-[50px] md:mt-[0px]">
                        <p class="text-[22px] md:text-[24px] leading-[30px] md:leading-[36px] font-bold">대표번호</p>
                        <Line />
                        <p class="text-[18px] leading-[24px] mt-[24px]">031-766-0700</p>
                    </div>
                </div>
            </section>

            <section class="w-full flex flex-col mt-[50px] md:mt-[70px] lg:mt-[130px] mb-[110px] md:mb-[80px] lg:mb-[160px]"
                id="photoList">
                <Carousel class="w-full flex justify-center" :itemsToShow="3.1" snapAlign="start" :transition="500">
                    <Slide class="p-0" v-for="(item, index) in list" :key="index">
                        <img :src="item.image_url" alt=""
                            class="w-[120px] md:w-[240px] lg:w-[320px] aspect-[1] object-cover ml-[-20px]"
                            @click="() => { onShowBanner(item) }" />
                    </Slide>
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss">
#photoList {
    .carousel__slide {
        padding-right: 10px;
    }

    .carousel__prev,
    .carousel__next {
        margin: 0px;
        width: 0px;
        height: 0px;

        @media (min-width: 768px) {
            width: 0px;
            height: 0px;
        }

        @media (min-width: 1280px) {
            width: 50px;
            height: 50px;
        }
    }

}
</style>