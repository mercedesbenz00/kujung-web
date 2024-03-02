<script setup lang="ts">
const route = useRoute();
import { api } from '~~/ts/api';
import { LikeEntityType, HouseEntity, OnlineHouseStatus } from '~/ts/constants';
import { House } from '~/ts/interfaces/House';
import { Common } from '~~/ts/_utils/common';
import ModalShare from '~~/components/ModalShare.vue';
import { useModal } from 'vue-final-modal';
import { User } from '~/ts/interfaces/User';
import { useStore } from '~/stores/common';
const store = useStore()

// meta
definePageMeta({
    layout: 'page',
    title: '이달의 랜덤 집들이'
});

const id = ref(route.query.id)

const loadingEnd = ref<boolean>(true)
const TAKE_COUNT = 9

const list = ref<House[]>([])
const userInfo = ref<User>()

onMounted(() => {
    // carousel이 타 화면에 갔다오면 동작하지 않는것에 대한 해결책
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);
    loadCompanyHouseList(true)
    loadUserInfo()
})

const loadUserInfo = async () => {
    const res = await api.get(`/user-management/${id.value}`);
    if (res.success) {
        userInfo.value = res.data
    } else {
    }
}

const loadCompanyHouseList = (p_refresh: boolean) => {
    if (p_refresh) {
        list.value = []
        loadingEnd.value = true
    }
    api.post('/expert-house/house-list', {
        take: TAKE_COUNT,
        page: parseInt(Number((list.value?.length) / TAKE_COUNT).toFixed(0)) + 1,
        requester_id: parseInt(id.value),
        entity_type_list: [HouseEntity.EXPERT, HouseEntity.ONLINE],
        status_list: [OnlineHouseStatus.APPROVED],
    })
        .then(response => {
            list.value = [...list.value, ...response.data.items]
            if (response.data.items.length < TAKE_COUNT) {
                loadingEnd.value = true
            } else {
                loadingEnd.value = false
            }
        })
}


const onLike = () => {
    Common.checkLogin(async () => {
        if (userInfo.value) {
            if (userInfo.value?.liked) {
                await api.post(`/like/cancel`, {
                    "type": LikeEntityType.User,
                    "entity_id": parseInt(id.value)
                })
                userInfo.value = { ...userInfo.value, liked: false }
            } else {
                await api.post(`/like`, {
                    "type": LikeEntityType.User,
                    "entity_id": parseInt(id.value)
                })
                userInfo.value = { ...userInfo.value, liked: true }
            }
        }
    })
}

const onShare = () => {
    const m = useModal({
        component: ModalShare,
        attrs: {
            shareUrl: location.href,
            title: userInfo.value?.company_name + "님의 집들이",
            imageUrl: "",
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
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                포트폴리오
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                {{ userInfo?.company_name || userInfo?.nickname }}님이 올려주신 집들이 포트폴리오입니다.
            </p>

            <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px]" />

            <div v-if="userInfo?.account_type == 'business'" class="w-full relative bg-[#FFFEF2] flex flex-col">
                <div class="absolute top-[10px] right-[10px] flex flex-row justify-end">
                    <BtnWithLA class="ml-[5px]" :laName="userInfo?.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                        text="좋아요" :onClick="() => { onLike() }" />
                    <BtnWithLA class="ml-[5px]" laName="fa-solid fa-share-nodes" text="공유하기"
                        :onClick="() => { onShare() }" />
                </div>
                <div class="md:flex-1 px-[28px] py-[20px] bg-[#FFFEF2] border border-warmGray-600">
                    <p class="text-[18px] md:text-[24px] font-bold">
                        업체 정보
                    </p>
                    <div class="flex flex-col gap-y-[8px] md:gap-y-[10px] mt-[21px]">
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                업체명</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ userInfo?.company_name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                업체주소</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ userInfo?.addr }} &nbsp;{{ userInfo?.addr_sub }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                대표자명</p>
                            <p class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ userInfo?.contact_name }}</p>
                        </div>
                        <div class="flex flex-row items-start">
                            <p
                                class="w-[100px] md:w-[140px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] font-bold">
                                연락처</p>
                            <p v-if="userInfo?.phone"
                                class="flex-1 text-[13px] md:text-[15px] leading-[18px] md:leading-[20px] text-warmGray-800">
                                {{ Common.formatPhoneNumber(userInfo?.phone) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section class="flex flex-col w-full mt-[25px] md:mt-[75px] lg:mt-[60px] mb-[100px] md:mb-[87px] lg:mb-[110px]">
                <div
                    class="grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in list" :key="slide.id" class="flex justify-center">
                        <CardHouse :item="slide" :isSimpleMode="true"
                            :onClick="() => { navigateTo(`/construction-ex/company-portfolio-detail?id=${slide.id}&isExpertType=${slide.entity_type == HouseEntity.EXPERT}`) }" />
                    </div>
                </div>
            </section>

            <button v-if="!loadingEnd" class="mb-[100px] md:mb-[87px] lg:mb-[110px] text-black text-[15px] font-bold border border-black
                    w-[320px] md:w-[420px] h-[54px] md:h-[70px]" @click="loadCompanyHouseList(false)">
                <i class="las la-plus"></i>&nbsp;
                더 보기
            </button>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>