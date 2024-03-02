<script setup lang="ts">
import Swal from "sweetalert2";
import { useModal } from 'vue-final-modal';
import { useStore } from '~/stores/common';
import { House } from '~/ts/interfaces/House';
import ModalConstructionExType from '~~/components/ModalConstructionExType.vue';
import { api } from '~~/ts/api';
import { HouseEntity, OnlineHouseStatus } from '~~/ts/constants';

const route = useRoute();
const store = useStore()

// meta
definePageMeta({
    layout: 'page',
    title: '나의 집들이'
});

const list = ref<House[]>([])

onMounted(() => {
    loadHouseList()
})

watch(() => store.profileInfo, (newConst, oldConst) => {
    if (newConst != null) {
        loadHouseList()
    }
})

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

const type = ref(1)

const onWriteHouseWarming = () => {
    open()
}

const onChangeTab = (p_type: number) => {
    type.value = p_type
    loadHouseList()
}

const onItemClick = (p_item: House) => {
    if (p_item.status == OnlineHouseStatus.REJECTED) {
        Swal.fire({
            title: "",
            html: " 적절하지 않은 사진이 포함되어있어 반려드립니다. 사진을 확인해주세요.",
            iconHtml: '<img src="/img/icons/error.svg">',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: `확인`,
            confirmButtonText: '수정하기',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                navigateTo(`/construction-ex/detail??isFromMyPage=true&id=${p_item.id}&isExpertType=${p_item.entity_type == HouseEntity.EXPERT}`)
            }
        });
    } else {
        navigateTo(`/construction-ex/detail??isFromMyPage=true&id=${p_item.id}&isExpertType=${p_item.entity_type == HouseEntity.EXPERT}`)
    }
}

const loadHouseList = () => {    
    if (!store.profileInfo) {
        return
    }
    api.post('/expert-house/house-list', {
        sortBy: "updated_at",
        order: "DESC",
        entity_type_list: type.value == 1 ? [HouseEntity.EXPERT, HouseEntity.ONLINE] : [type.value == 2 ? HouseEntity.ONLINE : HouseEntity.EXPERT],
        status_list: [OnlineHouseStatus.APPROVED, OnlineHouseStatus.WAITING, OnlineHouseStatus.REJECTED],
        requester_id: store.profileInfo.id,
    })
        .then(response => {
            if (response.success) {
                list.value = response.data.items
            }
        })
}


</script>

<template>
    <PageContainer>
        <div class="mypage-container">
            <MyPageMenu />

            <div class="flex flex-col w-full flex-1 lg:mt-[50px]">
                <section class="flex flex-col flex-1">
                    <div class="flex flex-row items-center justify-between">
                        <p class="text-[18px] text-black font-bold">
                            나의 집들이
                        </p>
                        <BtnWithLA class="ml-[5px]" laName="las la-edit" text="집들이 글쓰기"
                            :onClick="() => onWriteHouseWarming()" />
                    </div>
                    <Line class="mt-[15px] border-b-[2px]" />

                    <div class="flex flex-col md:flex-row gap-x-[1px] w-full mt-[25px]">
                        <BtnMyPageConstructionExTab text="전체보기" :selected="type == 1" :onClick="() => { onChangeTab(1) }" />
                        <BtnMyPageConstructionExTab text="랜선 집들이" :selected="type == 2"
                            :onClick="() => { onChangeTab(2) }" />
                        <BtnMyPageConstructionExTab text="전문가 집들이" :selected="type == 3"
                            :onClick="() => { onChangeTab(3) }" />
                    </div>

                    <div
                        class="mt-[58px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[82px] gap-y-[20px] md:gap-y-[40px] lg:gap-y-[32px]">
                        <CardConstructionExOnlineMyPage v-for="(item, index) in list" :index="index" :item="item" :onClick="() => {
                            onItemClick(item)
                        }" />
                    </div>
                </section>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>