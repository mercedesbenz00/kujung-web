<script setup lang="ts">
const route = useRoute();
import { api } from '~~/ts/api';
import Swal from "sweetalert2";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { OnlineHouse } from '~/ts/interfaces/OnlineHouse';
import { ExpertHouse } from '~/ts/interfaces/ExpertHouse';
import { Common } from '~/ts/_utils/common';
import { LikeEntityType, WishEntityType, HouseEntity, OnlineHouseStatus } from '~/ts/constants';
import { House } from '~/ts/interfaces/House';
import { useStore } from '~/stores/common';
import ModalShare from '~~/components/ModalShare.vue';
import { useModal } from 'vue-final-modal';
const router = useRouter();

// meta
definePageMeta({
    layout: 'page',
    title: '온라인 집들이'
});


const store = useStore()

const isMyItem = ref(route.query.isFromMyPage)
const list = ref<House[]>([])
const userHouseList = ref<House[]>([])
const id = ref(route.query.id)
const isExpertType = ref(route.query.isExpertType == 'true')
const detailInfo = ref<OnlineHouse & ExpertHouse>()

onMounted(() => {
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);
    loadInfo()
})

watch(() => [route.query.id, route.query.isExpertType], ([newId, newType]) => {
    id.value = newId
    isExpertType.value = newType == "true" ? true : false
    loadInfo()
    detailInfo.value = null
    document.querySelector("#container")?.scrollIntoView()
})

const loadInfo = () => {
    loadHouseDetail(id.value, isExpertType.value)
    loadRandomHouseList()
    loadUserHouseList()
}

const loadHouseDetail = (p_id: any, p_isExpertType: any) => {
    const url = p_isExpertType ? `/expert-house/${p_id}` : `/online-house/${p_id}`
    api.get(url)
        .then(response => {
            if (response.success) {
                detailInfo.value = response.data
            }
        })
}

const loadRandomHouseList = () => {
    api.post('/expert-house/house-list', {
        take: 3,
        random: true,
        entity_type_list: [HouseEntity.EXPERT, HouseEntity.ONLINE],
        status_list: [OnlineHouseStatus.APPROVED],
    })
        .then(response => {
            list.value = response.data.items
        })
}

const loadUserHouseList = () => {
    api.post('/expert-house/house-list', {
        take: 3,
        requester_id: detailInfo.value?.requester.id,
        random: true,
        entity_type_list: [HouseEntity.EXPERT, HouseEntity.ONLINE],
        status_list: [OnlineHouseStatus.APPROVED],
    })
        .then(response => {
            userHouseList.value = response.data.items
        })
}

const onLike = async () => {
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

const onDelete = async () => {
    Swal.fire({
        title: "",
        html: "정말 삭제하시겠습니까?",
        // iconHtml: '<img src="/img/icons/error.svg">',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: `아니오`,
        confirmButtonText: '예',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await api.delete(`/expert-house/${detailInfo.value?.id}`)
            if (res.success) {
                router.back()
            }
        }
    });

}

const onShare = () => {
    const m = useModal({
        component: ModalShare,
        attrs: {
            shareUrl: location.href,
            title: (detailInfo.value?.requester.company_name || detailInfo.value?.requester.nickname) + "님의 집들이",
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

const onAddWish = () => {
    if (detailInfo.value?.wished) {
        Common.checkLogin(async () => {
            await api.post(`/wish/cancel`, {
                "type": isExpertType.value ? WishEntityType.ExpertHouse : WishEntityType.OnlineHouse,
                "entity_id": detailInfo.value?.id
            })
            detailInfo.value = { ...detailInfo.value, wished: false }
        })
    } else {
        Common.checkLogin(async () => {
            await api.post(`/wish`, {
                "type": isExpertType.value ? WishEntityType.ExpertHouse : WishEntityType.OnlineHouse,
                "entity_id": detailInfo.value?.id
            })
            detailInfo.value = { ...detailInfo.value, wished: true }
            Common.showSuccessToast("위시리트스에 저장되었습니다.")
        })
    }
}

</script>

<template>
    <PageContainer>
        <div v-if="detailInfo"
            class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0" id="container">
            <div v-if="isMyItem" class="w-full flex flex-col mt-[36px] md:mt-[90px] mb-[-26px] md:mb-[-76px]">
                <div v-if="detailInfo.status == OnlineHouseStatus.WAITING"
                    class="construction-ex-status1 border-black bg-[#FFFEF2] self-end">
                    <p class="text-[11px] font-bold text-black">
                        발행 대기
                    </p>
                </div>
                <div v-else-if="detailInfo.status == OnlineHouseStatus.REJECTED"
                    class="construction-ex-status1 border-warmGray-900 bg-warmGray-900 self-end">
                    <p class="text-[11px] font-bold text-white">
                        발행 반려
                    </p>
                </div>
                <div v-else-if="detailInfo.status == OnlineHouseStatus.APPROVED"
                    class="construction-ex-status1 border-white bg-secondaryBlue-400 self-end">
                    <p class="text-[11px] font-bold text-white">
                        발행 완료
                    </p>
                </div>
                <LineThickGray class="mt-[10px] hidden md:flex" />
            </div>

            <!-- 모바일 기능버튼 -->
            <div class="w-full mt-[36px] flex md:hidden gap-x-[6px]">
                <BtnWithLA class="" :laName="detailInfo.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" text="좋아요"
                    :onClick="() => { onLike() }" />
                <BtnWithLA class="" laName="fa-solid fa-share-nodes" text="공유하기" :onClick="() => { onShare() }" />
                <BtnWithLA class="" :laName="detailInfo.wished ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'"
                    text="관심상품" :onClick="() => { onAddWish() }" />
            </div>

            <LineThickGray class="mt-[10px] md:mt-[86px] lg:hidden" />

            <div class="w-full flex flex-col mt-[13px] md:mt-[20px] lg:mt-[90px]">
                <span class="hidden lg:block text-[11px] text-warmGray-600 mb-[10px]">
                    온라인 집들이 <i class="las la-angle-right"></i>
                    <span class="text-[#1A1A1A] font-bold"> {{ isExpertType ? "전문가 집들이" : "랜선 집들이" }}</span>
                </span>
                <p v-if="isExpertType"
                    class="text-[18px] leading-[24px] md:text-[24px] md:leading-[36px] font-bold mr-[50px] md:mr-0 break-keep">
                    {{ detailInfo?.title }}
                </p>
                <div class="flex flex-row mt-[15px] md:mt-[18px] lg:mt-[13px] justify-between items-center">
                    <div class="flex flex-row items-center cursor-pointer"
                        @click="() => { navigateTo(`/construction-ex/company-portfolio?id=${detailInfo?.requester.id}`) }">
                        <img :src="Common.isValid(detailInfo?.requester.profile?.photo) ? detailInfo?.requester.profile?.photo : (isExpertType ? '/img/default_profile_blue.svg' : '/img/default_profile.svg')"
                            class="cursor-pointer w-[18px] md:w-[23px] lg:md:w-[32px] aspect-[1] rounded-[8px]" />
                        <p class="ml-[10px] text-black text-[12px] md:text-[15px] leading-[20px] font-bold">
                            {{ detailInfo?.requester.company_name || detailInfo?.requester.nickname }}</p>
                    </div>

                    <div class="hidden md:flex gap-x-[6px]">
                        <BtnWithLA class="" :laName="detailInfo.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                            text="좋아요" :onClick="() => { onLike() }" />
                        <BtnWithLA class="" laName="fa-solid fa-share-nodes" text="공유하기" :onClick="() => { onShare() }" />
                        <BtnWithLA class="" :laName="detailInfo.wished ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'"
                            text="관심상품" :onClick="() => { onAddWish() }" />
                    </div>
                </div>
                <LineGray class="mt-[23px] md:mt-[20px] lg:hidden" />
            </div>

            <div class="w-full flex flex-col md:flex-row gap-[8px] mt-[13px] md:mt-[50px] lg:mt-[10px]">
                <div class="md:flex-1 px-[28px] py-[20px] bg-[#F2EFE2] border border-warmGray-600">
                    <p class="text-[18px] md:text-[24px] font-bold">
                        사례 정보
                    </p>
                    <div class="flex flex-col gap-y-[8px] md:gap-y-[10px] mt-[21px]">
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                컬러별</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ detailInfo?.color_info.name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                주거면적</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ detailInfo?.area_space_info.name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                주거 공간</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ detailInfo?.house_type_info.name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                가족형태</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ detailInfo?.family_type_info.name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                스타일별</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ detailInfo?.house_style_info.name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                태그별</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                <span v-for="(tag, index) in detailInfo?.tags" :key="index">
                                    {{ tag.name }} <span v-if="index < detailInfo?.tags?.length - 1">| </span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="md:flex-1 px-[28px] py-[20px] bg-[#F2EFE2] border border-warmGray-600">
                    <p class="text-[18px] md:text-[24px] font-bold">
                        마루 정보
                    </p>
                    <div class="cursor-pointer" @click="navigateTo(`/product/detail?id=${detailInfo?.product.id}`)">
                        <div class="flex flex-row mt-[24px] gap-x-[6px]">
                            <img :src="Common.getThumbnailUrl(detailInfo?.product?.productImages[0]?.image_url)"
                                :alt="detailInfo?.product?.category_level1?.name" class="w-[106px] h-[88px]" />
                            <img :src="Common.getThumbnailUrl(detailInfo?.product?.productImages[1]?.image_url)"
                                :alt="detailInfo?.product?.category_level2?.name" class="w-[106px] h-[88px]" />
                        </div>
                        <div class="mt-[16px]">
                            <span class="text-[11px] leading-[15px] text-warmGray-600">
                                {{ detailInfo?.product?.category_level1?.name }} <i class="las la-angle-right"></i>
                                <span class="text-[#1A1A1A] font-bold">
                                    {{ detailInfo?.product?.category_level2?.name }}</span>
                            </span>
                        </div>
                        <p
                            class="mt-[10px] md:mt-[13px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                            {{ detailInfo?.product?.title }}</p>
                    </div>
                </div>
            </div>

            <div v-if="isExpertType && detailInfo.requester.account_type == 'business'"
                class="w-full mt-[10px] md:mt-[27px] lg:mt-[50px] px-[28px] py-[20px] bg-[#F2EFE2] border border-warmGray-600">
                <div class="flex flex-row items-center">
                    <p class="text-[18px] md:text-[24px] font-bold">
                        전문가 정보
                    </p>
                    <button
                        @click="() => { navigateTo(`/construction-ex/company-portfolio?id=${detailInfo?.requester.id}`) }"
                        class="ml-[30px] lg:ml-[60px] px-[17px] py-[9px] text-[11px] leading-[15px] text-warmGray-900 font-bold border border-warmGray-600 bg-warmGray-200">
                        포트폴리오 더보기
                    </button>
                </div>
                <div class="grid lg:grid-cols-2 gap-y-[8px] md:gap-y-[10px] mt-[21px]">
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
                            공간 정보</p>
                        <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                            {{ detailInfo.building_addr }}</p>
                    </div>
                    <div class="flex flex-row items-start">
                        <p
                            class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                            대표자</p>
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


            <Carousel v-if="!isExpertType" class="w-full mt-[30px] lg:mt-[40px] flex flex-col justify-center"
                :touchDrag="true" :itemsToShow="1" :wrapAround="true" :transition="500">
                <Slide class="p-0" v-for="(item, index) in detailInfo?.onlineHouseImages" :key="index">
                    <img :src="item.image_url" class="w-full h-[260px] md:h-[450px] lg:h-[600px] object-contain" />
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
            <div v-else :innerHTML="detailInfo?.content" class="w-full mt-[30px] object-cover">
            </div>

            <div v-if="isMyItem" class="flex flex-row mt-[50px] md:mt-[15px] md:w-full">
                <button class="hidden md:block text-[13px] text-white bg-primary-600 w-[122px] h-[40px] md:h-[40px]"
                    @click="navigateTo(`/construction-ex/online#${isExpertType ? 'isExpertType' : 'isNormalType'}`)">
                    목록
                </button>
                <div class="flex-1" />
                <button v-if="detailInfo.status != OnlineHouseStatus.APPROVED" @click="() => {
                    navigateTo(`/construction-ex/write?type=${isExpertType ? 2 : 1}&editId=${detailInfo?.id}`)
                }"
                    class="text-[13px] text-black bg-warmGray-400 border border-secondaryNavy-500 w-[122px] h-[40px] md:h-[40px] mr-[8px]">
                    수정
                    <i class="las la-pen"></i>
                </button>
                <button class="text-[13px] text-white bg-secondaryNavy-500 w-[122px] h-[40px] md:h-[40px]"
                    @click="onDelete">
                    삭제
                    <i class="las la-trash"></i>
                </button>
            </div>

            <button v-if="isMyItem"
                class="md:hidden mt-[30px] md:mt-[50px] lg:mt-[60px] text-[15px] text-white bg-primary-600 w-[320px] md:w-[420px] h-[55px] md:h-[70px]"
                @click="navigateTo(`/construction-ex/online#${isExpertType ? 'isExpertType' : 'isNormalType'}`)">
                목록
            </button>

            <button v-if="!isMyItem"
                class="mt-[30px] md:mt-[50px] lg:mt-[60px] text-[15px] text-white bg-primary-600 w-[320px] md:w-[420px] h-[55px] md:h-[70px]"
                @click="navigateTo(`/construction-ex/online#${isExpertType ? 'isExpertType' : 'isNormalType'}`)">
                목록
            </button>


            <!-- <div v-if="isMyItem class="w-full mt-[60px]">
                <p class="text-[15px] md:text-[24px] leading-[20px] md:leading-[36px] font-bold">유사 제품 보기</p>
                <LineGray class="mt-[10px]" />
                <div
                    class="mt-[20px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in 3" :key="slide" class="flex justify-center">
                        <CardHouse :isExpertType="type != 1"
                            :onClick="() => { navigateTo('/construction-ex/detail') }" />
                    </div>
                </div>
            </div> -->

            <div class="w-full mt-[60px]">
                <p class="text-[15px] md:text-[24px] leading-[20px] md:leading-[36px] font-bold">다른 집들이 소개</p>
                <LineGray class="mt-[10px]" />

                <div
                    class="mt-[20px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in list" :key="slide.id" class="flex justify-center">
                        <CardHouse :item="slide"
                            :onClick="() => { navigateTo(`/construction-ex/detail?id=${slide.id}&isExpertType=${slide.entity_type == HouseEntity.EXPERT}`) }" />
                    </div>
                </div>
            </div>

            <div v-if="store.isLoggedIn && userHouseList.length > 0" class="w-full mt-[-30px]">
                <p class="text-[15px] md:text-[24px] leading-[20px] md:leading-[36px] font-bold">
                    [{{ detailInfo.requester.nickname }}]님이 올린 집들이 소개</p>
                <LineGray class="mt-[10px]" />

                <div
                    class="mt-[20px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in userHouseList" :key="slide.id" class="flex justify-center">
                        <CardHouse :item="slide"
                            :onClick="() => { navigateTo(`/construction-ex/detail?id=${slide.id}&isExpertType=${slide.entity_type == HouseEntity.EXPERT}`) }" />
                    </div>
                </div>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>