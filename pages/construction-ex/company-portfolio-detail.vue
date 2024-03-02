<script setup lang="ts">
const route = useRoute();
import { api } from '~~/ts/api';
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { OnlineHouse } from '~/ts/interfaces/OnlineHouse';
import { ExpertHouse } from '~/ts/interfaces/ExpertHouse';
import { Common } from '~/ts/_utils/common';
import { LikeEntityType, HouseEntity, OnlineHouseStatus } from '~/ts/constants';
import { House } from '~/ts/interfaces/House';
import { useStore } from '~/stores/common';
import ModalShare from '~~/components/ModalShare.vue';
import { useModal } from 'vue-final-modal';

// meta
definePageMeta({
    layout: 'page',
    title: '기업포트폴리오'
});


const totalCnt = ref<number>(0)
const TAKE_COUNT = 9
const currentPage = ref<number>(1)

const userHouseList = ref<House[]>([])
const id = ref(route.query.id)
const isExpertType = ref(route.query.isExpertType == 'true')
const detailInfo = ref<OnlineHouse & ExpertHouse>()

onMounted(() => {
    loadInfo()
})

watch(() => route.query.id, (newId, oldId) => {
    id.value = newId
    loadInfo()
})

const loadInfo = () => {
    loadHouseDetail(id.value, isExpertType.value)
}

const loadHouseDetail = (p_id: any, p_isExpertType: any) => {
    const url = p_isExpertType ? `/expert-house/${p_id}` : `/online-house/${p_id}`
    api.get(url)
        .then(response => {
            if (response.success) {
                detailInfo.value = response.data
                loadUserHouseList(1)
            }
        })
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    loadUserHouseList(val)
}

const loadUserHouseList = (p_page: number) => {
    currentPage.value = p_page
    api.post('/expert-house/house-list', {
        page: p_page,
        take: TAKE_COUNT,
        requester_id: detailInfo.value?.requester.id,
        entity_type_list: [HouseEntity.EXPERT, HouseEntity.ONLINE],
        status_list: [OnlineHouseStatus.APPROVED],
    })
        .then(response => {
            userHouseList.value = response.data.items
            totalCnt.value = response.data.meta.totalCount
        })
}


const onLike = () => {
    if (detailInfo.value?.liked) {
        Common.checkLogin(async () => {
            await api.post(`/like/cancel`, {
                "type": isExpertType.value ? LikeEntityType.ExpertHouse : LikeEntityType.OnlineHouse,
                "entity_id": detailInfo.value?.id
            })
            detailInfo.value = { ...detailInfo.value, liked: false }
        })
    } else {
        Common.checkLogin(async () => {
            await api.post(`/like`, {
                "type": isExpertType.value ? LikeEntityType.ExpertHouse : LikeEntityType.OnlineHouse,
                "entity_id": detailInfo.value?.id
            })
            detailInfo.value = { ...detailInfo.value, liked: true }
        })
    }
}

const onShare = () => {
    const m = useModal({
        component: ModalShare,
        attrs: {
            shareUrl: location.href,
            title: detailInfo.value?.requester.name + "님의 집들이",
            imageUrl: isExpertType.value ? detailInfo.value?.thumb_url! : detailInfo.value?.onlineHouseImages[0].image_url!,
            onConfirm() {
                store.setCurModalIndicator(null)
                m.close()
            },
        },
        slots: {
            default: ``,
        },
    })
    store.setCurModalIndicator(m)
    m.open()
}

</script>

<template>
    <PageContainer>
        <div v-if="detailInfo"
            class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <!-- 모바일 기능버튼 -->
            <div class="w-full mt-[36px] flex md:hidden gap-x-[6px]">
                <BtnWithLA class="" :laName="detailInfo.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" text="좋아요"
                    :onClick="() => { onLike() }" />
                <BtnWithLA class="" laName="fa-solid fa-share-nodes" text="공유하기" :onClick="() => { onShare() }" />
            </div>

            <LineThickGray class="mt-[10px] md:mt-[86px] lg:md:mt-[97px]" />

            <div class="w-full flex flex-col mt-[25px]">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row items-center">
                        <img :src="Common.isValid(detailInfo?.requester.profile?.photo) ? detailInfo?.requester.profile?.photo : (isExpertType ? '/img/default_profile_blue.svg' : '/img/default_profile.svg')"
                            class="cursor-pointer w-[18px] md:w-[23px] lg:md:w-[32px] rounded-[8px] aspect-[1]" />
                        <p class="ml-[10px] text-black text-[12px] md:text-[15px] leading-[20px] font-bold">{{
                            detailInfo?.requester.company_name || detailInfo?.requester.nickname }}</p>
                    </div>

                    <div class="hidden md:flex gap-x-[6px]">
                        <BtnWithLA class="" :laName="detailInfo.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                            text="좋아요" :onClick="() => { onLike() }" />
                        <BtnWithLA class="" laName="fa-solid fa-share-nodes" text="공유하기" :onClick="() => { onShare() }" />
                    </div>
                </div>
                <LineGray class="mt-[23px] md:mt-[20px]" />
            </div>

            <Carousel v-if="!isExpertType" class="w-full mt-[14px] md:mt-[50px] lg:mt-[20px] flex flex-col justify-center"
                :touchDrag="true" :itemsToShow="1" :wrapAround="true" :transition="500">
                <Slide class="p-0" v-for="(item, index) in detailInfo?.onlineHouseImages" :key="index">
                    <img :src="item.image_url" class="w-full h-[260px] md:h-[450px] lg:h-[600px] object-cover" />
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
            <div v-else :innerHTML="detailInfo?.content" class="w-full mt-[14px] md:mt-[50px] lg:mt-[20px] object-cover">
            </div>

            <div class="w-full flex flex-col md:flex-row gap-[8px] mt-[13px] md:mt-[18px] lg:mt-[14px]">
                <div class="md:flex-1 px-[28px] py-[20px] bg-[#F2EFE2] border border-warmGray-600" v-if="detailInfo.requester.company_name">
                    <p class="text-[18px] md:text-[24px] font-bold">
                        업체 정보
                    </p>
                    <div class="flex flex-col gap-y-[8px] md:gap-y-[10px] mt-[21px]">
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                업체명</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ detailInfo.requester.company_name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                업체주소</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ detailInfo.requester.addr + " " + detailInfo.requester.addr_sub }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                대표자명</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ detailInfo.requester.contact_name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                연락처</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ Common.formatPhoneNumber(detailInfo.requester.phone) }}</p>
                        </div>
                    </div>
                </div>
                <div class="md:flex-1 px-[28px] py-[20px] bg-[#F2EFE2] border border-warmGray-600">
                    <p class="text-[18px] md:text-[24px] font-bold">
                        마루 정보
                    </p>
                    <div class="flex flex-row mt-[24px] gap-x-[6px]">
                        <img :src="detailInfo?.product?.category_level1?.image_url" class="w-[106px] h-[88px]" />
                        <img :src="detailInfo?.product?.category_level2?.image_url" class="w-[106px] h-[88px]" />
                    </div>
                    <div class="mt-[16px]">
                        <span class="text-[11px] leading-[15px] text-warmGray-600">
                            {{ detailInfo?.product?.category_level1?.name }} <i class="las la-angle-right"></i>
                            <span class="text-[#1A1A1A] font-bold"> {{ detailInfo?.product?.category_level2?.name }}</span>
                        </span>
                    </div>
                    <p class="mt-[10px] md:mt-[13px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                        {{ detailInfo?.product?.title }}</p>
                </div>
            </div>

            <LineGray class="mt-[60px]" />

            <div class="w-full mt-[10px] md:mt-[30px]">
                <p class="text-[15px] md:text-[24px] leading-[20px] md:leading-[36px] font-bold">업체 포트폴리오</p>
                <div
                    class="mt-[20px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in userHouseList" :key="slide.id" class="flex justify-center">
                        <CardHouse :item="slide" :isSimpleMode="true"
                            :onClick="() => { navigateTo(`/construction-ex/company-portfolio-detail?id=${slide.id}&isExpertType=${slide.entity_type == HouseEntity.EXPERT}`) }" />
                    </div>
                </div>
            </div>

            <section class="flex flex-row justify-center mb-[110px] items-center">
                <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background layout="prev, jumper, next"
                    :total="totalCnt" @current-change="handleCurrentChange" />
                <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                    {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
            </section>

        </div>
    </PageContainer>
</template>

<style lang="scss"></style>