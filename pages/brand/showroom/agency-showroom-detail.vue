<script setup lang="ts">
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { GoogleMap, Marker } from "vue3-google-map";
import { api } from "~/ts/api";
import { AgencyStore } from "~/ts/interfaces/AgencyStore";

const route = useRoute();

const storeId = route.query.id ?? 0;

const store = ref<AgencyStore | null>(null)

// meta
definePageMeta({
    layout: 'page',
    title: '전국 대리점 쇼룸'
});


onMounted(() => {
    loadStoreDetail(storeId)
})

const loadStoreDetail = (p_storeId: any) => {
    api.get(`/homepage/agency-store/${p_storeId}`)
        .then(response => {
            if (response.success) {
                store.value = response.data
            }
        })
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                전국 대리점 쇼룸
            </p>
            <p
                class="hidden md:block text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루를 전문으로 취급하는 대리점 전시장 입니다. 희망하는 지역의 대리점을 찾아보세요.
            </p>
            <p
                class="block md:hidden text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루를 전문으로 취급하는 대리점 전시장 입니다.<br />
                희망하는 지역의 대리점을 찾아보세요.
            </p>

            <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px]" />

            <div class="w-full bg-[#FFFEF2] px-[16px] md:px-[32px] py-[34px] mb-[55px] md:mb-[124px] lg:mb-[110px]">
                <p class="text-primary-500 text-[11px] md:text-[22px] font-bold leading-[15px] md:leading-[30px]">
                    온라인 최저가격 및 견적주의
                </p>
                <p
                    class="text-black text-[11px] md:text-[18px] leading-[15px] md:leading-[24px] whitespace-pre-line mt-[10px] md:mt-[15px]">
                    목재 마루 바닥재는 설치 제품 특성상 여러 요인으로 견적이 결정됩니다.<br />
                    온라인 최저 가격에 현혹되지 마시고, 정확한 현장 실측 및 견적을 받는게 중요합니다.<br />
                    구정마루는 전국 수 만개의 인테리어 회사 및 대리점과 함께합니다.<br />
                    공식 대리점을 통한 시공이 아닐 경우 <span class="bg-primary-500 text-white">자재 보증 및 A/S관련 불이익</span>을 받을 수 있습니다.
                </p>
            </div>

            <section v-if="store" class="w-full">
                <div class="flex flex-col md:flex-row mt-[20px] items-center">
                    <img :src="store.image_url"
                        class="w-[320px] h-[320px] lg:w-[500px] lg:h-[500px]  object-cover self-center" />
                    <div class="flex flex-col w-full md:flex-1 md:ml-[12px] lg:ml-[24px]">
                        <div class="flex flex-col mt-[12px] md:mt-[0px]">
                            <div class="flex flex-row items-center ml-[20px]">
                                <p class="text-[22px] lg:text-[22px] leading-[30px] lg:leading-[30px] font-bold">
                                    {{ store.name }}
                                </p>
                                <img v-if="store.is_gold" :src="'/img/icons/ic_badge_best.png'" alt="Best badge"
                                    class="w-[60px] lg:w-[100px] aspect-[1] ml-[5px]" />
                            </div>
                            <LineGray />
                            <div class="flex flex-col px-[10px] mt-[14px] gap-y-[10px]">
                                <div class="flex flex-row items-start">
                                    <p
                                        class="w-[55px] lg:w-[66px] text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] font-bold ">
                                        주소
                                    </p>
                                    <p
                                        class="text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] ml-[30px] lg:ml-[60px] flex-1">
                                        {{ store.addr }} &nbsp; {{ store.addr_sub }}
                                    </p>
                                </div>
                                <div class="flex flex-row items-start">
                                    <p
                                        class="w-[55px] lg:w-[66px] text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] font-bold">
                                        전화번호
                                    </p>
                                    <p
                                        class="text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] ml-[30px] lg:ml-[60px] flex-1">
                                        {{ store.phone.replace(/( )/g, "-") }}
                                    </p>
                                </div>
                                <div class="flex flex-row items-start">
                                    <p
                                        class="w-[55px] lg:w-[66px] text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] font-bold">
                                        운영시간
                                    </p>
                                    <p
                                        class="text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] ml-[30px] lg:ml-[60px] flex-1 whitespace-pre-line">
                                        {{ store.opening_hours }}
                                    </p>
                                </div>
                                <div class="flex flex-row items-start">
                                    <p
                                        class="w-[55px] lg:w-[66px] text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] font-bold">
                                        특징
                                    </p>
                                    <p
                                        class="text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] ml-[30px] lg:ml-[60px] flex-1">
                                        {{ store.feature }}
                                    </p>
                                </div>
                            </div>
                            <LineGray class="mt-[50px] lg:mt-[25px]" />

                            <div class="flex flex-col px-[10px] mt-[14px] gap-y-[10px]">
                                <div class="flex flex-row items-start">
                                    <p
                                        class="w-[55px] lg:w-[66px] text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] font-bold">
                                        뱃지정보
                                    </p>
                                    <p
                                        class="text-[15px] lg:text-[18px] leading-[20px] lg:leading-[24px] ml-[30px] lg:ml-[60px] flex-1">
                                        구정마루 대부분의 제품을 볼 수 있는 전시장으로
                                        우수전시 지점으로 선정되면 주어지는 뱃지입니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="w-full flex flex-col mt-[100px] md:mt-[66px] lg:mt-[155px]">
                <p class="text-[18px] lg:text-[24px] leading-[24px] lg:leading-[30px] font-bold">오시는 길</p>
                <GoogleMap api-key="AIzaSyAo4EXRmULnR632cOcetYqVo_amWrs3k6M"
                    class="w-full h-[320px] md:h-[400px] mt-[22px] lg:mt-[15px]" :zoom="15"
                    :center="{ lat: store?.lat, lng: store?.lng }">
                    <Marker :options="{ position: { lat: store?.lat, lng: store?.lng } }">
                    </Marker>
                </GoogleMap>
            </section>

            <section class="w-full flex flex-col mt-[100px] lg:mt-[80px] mb-[110px] lg:mb-[80px]" id="galleryBanner">
                <p class="text-[18px] lg:text-[24px] leading-[24px] lg:leading-[30px] font-bold">갤러리</p>
                <Carousel class="w-full flex flex-col justify-center mt-[22px] lg:mt-[15px]" :touchDrag="false"
                    :itemsToShow="1" :wrapAround="true" :transition="500">
                    <Slide class="p-0" v-for="(item, index) in store?.agencyStoreImages" :key="index">
                        <img :src="item.image_url"
                            class="w-full md:w-[400px] lg:w-[500px] h-[320px] md:h-[400px] lg:h-[500px] object-cover" />
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
#galleryBanner {
    .carousel__slide {
        padding: 0px;
    }

    .carousel__prev,
    .carousel__next {
        margin: 0px;
        width: 50px;
        height: 50px;

    }
}
</style>