<script setup lang="ts">
import Swal from "sweetalert2";
import { GoogleMap, Marker } from "vue3-google-map";
import { useStore } from "~/stores/common";
import { api } from "~/ts/api";
import { SCREEN_WIDTH, SESSION_PARAMS } from "~~/ts/constants";
import { AgencyStore } from '~~/ts/interfaces/AgencyStore';

const route = useRoute();

var lat = 0
var lng = 0
const selectedAreaCode = ref<number>(0)
const storeList = ref<AgencyStore[]>()
const selectedStore = ref<AgencyStore | null>(null)

// meta
definePageMeta({
    layout: 'page',
    title: '전국 대리점 쇼룸'
});

onMounted(() => {
    loadStoreList(0)
    return;

    // 위치팝업 삭제
    const locationPermitted = sessionStorage.getItem(SESSION_PARAMS.LOCATION_PERMITTED)
    if (locationPermitted == "Y") {
        getUserPosition()
    } else if (locationPermitted == "N") {
        loadStoreList(0)
    } else {
        Swal.fire({
            title: "",
            html: "현재 위치를 제공하여<br/>내 위치와 가까운 매장을 검색합니다.",
            iconHtml: '<img src="/img/icons/error.svg">',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: `차단`,
            confirmButtonText: '허용',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.setItem(SESSION_PARAMS.LOCATION_PERMITTED, "Y")
                getUserPosition()
            } else {
                sessionStorage.setItem(SESSION_PARAMS.LOCATION_PERMITTED, "N")
                loadStoreList(0)
            }
        });
    }

})

const store = useStore()

const getUserPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("1111111111", position)
        lat = position.coords.latitude
        lng = position.coords.longitude
        loadStoreList(0)
    }, (err) => {
        console.log("222222222", err)
        loadStoreList(0)
    })
}

const loadStoreList = (p_selectedAreaCode: number) => {
    selectedAreaCode.value = p_selectedAreaCode
    api.post('/homepage/agency-store/list', {
        needAllCount: true,
        area_list: p_selectedAreaCode == 0 ? null : [p_selectedAreaCode],
        // lat: lat,
        // lng: lng,
        sortBy: "priority",
        order: "DESC",
    })
        .then(response => {
            storeList.value = response.data.items
            if (storeList.value && storeList.value?.length > 0) {
                selectedStore.value = storeList.value[0]
            } else {
                selectedStore.value = null
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

            <div class="w-full bg-[#FFFEF2] px-[16px] md:px-[32px] py-[34px] mb-[50px] lg:mb-[34px]">
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

            <div class="w-full mb-[45px] lg:mb-[30px]">
                <BtnArea class="mr-[10px] mb-[5px]" :selected="selectedAreaCode == 0" :text="'전체'"
                    @click="loadStoreList(0)" />
                <BtnArea class="mr-[10px] mb-[5px]" :selected="selectedAreaCode == item.id" @click="loadStoreList(item.id)"
                    v-for="item in store.commonConstants?.find(it => it.type == 'area_code')?.items" :text="item.name" />
            </div>

            <GoogleMap api-key="AIzaSyAo4EXRmULnR632cOcetYqVo_amWrs3k6M" class="w-full h-[320px] md:h-[400px]" :zoom="7"
                :center="{ lat: 37.541, lng: 126.986 }">
                <Marker :options="{ position: { lat: item.lat, lng: item.lng } }" v-for="item in storeList">
                </Marker>
            </GoogleMap>

            <section class="mt-[85px] lg:mt-[48px] w-full pb-[96px] md:pb-[63px] lg:pb-[110px]">
                <div class="flex flex-row justify-between items-center">
                    <p class="text-[18px] lg:text-[24px] leading-[24px] lg:leading-[36px] font-bold">
                        검색결과
                    </p>
                    <p class="text-[11px] lg:text-[15px] leading-[15px] lg:leading-[20px] font-bold">
                        총 {{ storeList?.length }}건의 쇼룸이 검색 되었습니다.
                    </p>
                </div>
                <Line class="mt-[8px]" />

                <div class="flex flex-col md:flex-row mt-[20px] md:items-center">
                    <el-scrollbar :height="SCREEN_WIDTH < 720 ? `348px` : SCREEN_WIDTH < 1024 ? `500px` : `700px`"
                        class="w-full md:flex-1 bg-[#C2BFB5] mt-[20px] md:mt-0" always>
                        <div class="flex flex-col px-[20px] pt-[35px] md:pt-[45px]">
                            <CardShowRoom v-for="(item, index) in storeList" :item="item" :key="item.id"
                                @click="() => { selectedStore = item }" />
                        </div>
                    </el-scrollbar>
                    <div v-if="selectedStore"
                        class="flex flex-col md:w-[364px] lg:w-[512px] px-[25px] py-[30px] md:py-[40px] lg:py-[50px] cursor-pointer"
                        @click="() => {
                            navigateTo(`/brand/showroom/agency-showroom-detail?id=${selectedStore?.id}`)
                        }">
                        <img :src="selectedStore.image_url" class="w-full aspect-[1]  object-cover" />
                        <div class="flex flex-col mt-[12px] lg:mt-[25px]">
                            <div class="flex flex-row items-center">
                                <p class="text-[22px] lg:text-[22px] leading-[30px] lg:leading-[30px] font-bold">
                                    {{ selectedStore.name }}
                                </p>
                                <img v-if="selectedStore.is_gold" :src="'/img/icons/ic_badge_best.png'" alt="Best badge"
                                    class="w-[40px] lg:w-[90px] aspect-[1] ml-[5px]" />
                            </div>
                            <p class="text-[13px] lg:text-[15px] leading-[18px] lg:leading-[20px] mt-[20px] lg:mt-[0px]">
                                주소 : {{ selectedStore.addr }}&nbsp;{{ selectedStore.addr_sub }}
                            </p>
                            <p class="text-[13px] lg:text-[15px] leading-[18px] lg:leading-[20px] mt-[8px]">
                                전화 : {{ selectedStore.phone.replace(/( )/g, "-") }}
                            </p>
                            <p
                                class="text-[13px] lg:text-[15px] leading-[18px] lg:leading-[20px] mt-[8px] whitespace-pre-line">
                                운영 시간 : {{ selectedStore.opening_hours }}
                            </p>
                            <p class="text-[13px] lg:text-[15px] leading-[18px] lg:leading-[20px] mt-[8px]">
                                방문시 전화 부탁드립니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>