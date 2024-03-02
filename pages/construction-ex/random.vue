<script setup lang="ts">
const route = useRoute();
import { api } from '~~/ts/api';
import { CommonConstantType, OnlineHouseStatus, HouseEntity } from '~~/ts/constants';
import { Common } from '~~/ts/_utils/common';
import { useModal } from 'vue-final-modal'
import ModalConstructionExType from '~~/components/ModalConstructionExType.vue';
import { House } from '~/ts/interfaces/House';

// meta
definePageMeta({
    layout: 'page',
    title: '이달의 랜덤 집들이'
});

const TAKE_COUNT = 9

const expertHouselist = ref<House[]>([])
const onlineHouselist = ref<House[]>([])

onMounted(() => {
    loadExpertHouseList()
    loadOnlineHouseList()
})

const loadExpertHouseList = () => {
    api.post('/expert-house/house-list', {
        take: TAKE_COUNT,
        is_this_month: true,
        entity_type_list: [HouseEntity.EXPERT],
        status_list: [OnlineHouseStatus.APPROVED],
    })
        .then(response => {
            if (response.success) {
                expertHouselist.value = response.data.items
            }
        })
}

const loadOnlineHouseList = () => {
    api.post('/expert-house/house-list', {
        take: TAKE_COUNT,
        is_this_month: true,
        entity_type_list: [HouseEntity.ONLINE],
        status_list: [OnlineHouseStatus.APPROVED],
    })
        .then(response => {
            if (response.success) {
                onlineHouselist.value = response.data.items
            }
        })
}


const { open, close } = useModal({
    component: ModalConstructionExType,
    attrs: {
        onSelect: (p_type: number) => {
            navigateTo(`/construction-ex/write?type=${p_type}`)
            close()
        },
        onConfirm() {
            close()
        },
    },
    slots: {
        default: ``,
    },
})


const onWriteHouseWarming = () => {
    open()
}

const onAsk = () => {
    Common.checkLogin(() => {
        navigateTo("/mypage/my-writes/inquiry-write?category=온라인 집들이")
    })
}

</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                이달의 랜덤 집들이
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                매월 진행되는 랜덤 인테리어를 확인해보세요!
            </p>

            <Line class="mt-[30px] md:mt-[45px] lg:hidden" />

            <div class="w-full flex flex-row justify-end mt-[10px] md:mt-[20px] lg:mt-[15px]">
                <BtnWithLA class="ml-[5px]" laName="las la-file-alt" text="문의하기" :onClick="() => { onAsk() }" />
                <BtnWithLA class="ml-[5px]" laName="las la-edit" text="집들이 글쓰기" :onClick="() => onWriteHouseWarming()" />
            </div>

            <Line class="mt-[15px] hidden lg:block" />

            <section class="flex flex-col w-full mt-[60px] md:mt-[56px] lg:mt-[36px]">
                <p class="text-[18px] leading-[24px] md:text-[24px] md:leading-[30px] font-bold">
                    랜덤 사진 집들이
                </p>
                <div
                    class="mt-[10px] md:mt-[26px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in onlineHouselist" :key="slide.id" class="flex justify-center">
                        <CardHouse :item="slide" :isSimpleMode="true"
                            :onClick="() => { navigateTo(`/construction-ex/detail?id=${slide.id}&isExpertType=${slide.entity_type == HouseEntity.EXPERT}`) }" />
                    </div>
                </div>
            </section>

            <Line class="mt-[50px] md:mt-[60px]" />

            <section class="flex flex-col w-full mt-[50px] lg:mt-[30px]">
                <p class="text-[18px] leading-[24px] md:text-[24px] md:leading-[30px] font-bold">
                    전문가 집들이
                </p>
                <div
                    class="mt-[10px] md:mt-[20px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in expertHouselist" :key="slide.id" class="flex justify-center">
                        <CardHouse :item="slide" :isSimpleMode="true"
                            :onClick="() => { navigateTo(`/construction-ex/detail?id=${slide.id}&isExpertType=${slide.entity_type == HouseEntity.EXPERT}`) }" />
                    </div>
                </div>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>