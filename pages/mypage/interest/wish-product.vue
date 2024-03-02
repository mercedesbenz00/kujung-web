<script setup lang="ts">
import { WishEntityType } from '~/ts/constants';
import { Wish } from "~/ts/interfaces/Wish";
import { api } from '~~/ts/api';

const route = useRoute();

// meta
definePageMeta({
    layout: 'page',
    title: '관심 상품'
});
const wishList = ref<Wish[]>([])
const commandList = ref(
    [{ name: "전체", selected: true, type: "" },
    { name: "마루제품", selected: false, type: WishEntityType.Product },
    { name: "랜선 집들이", selected: false, type: WishEntityType.OnlineHouse },
    { name: "전문가 집들이", selected: false, type: WishEntityType.ExpertHouse },
    { name: "스마트 스토어", selected: false, type: WishEntityType.SmartStore },
    ])

onMounted(() => {
    getProductWishList()
})

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    getProductWishList()
}

const getProductWishList = async () => {
    const res = await api.get(`/wish?type=${commandList.value.find(it => it.selected)?.type}`)
    if (res.success) {
        wishList.value = res.data.items
    }
}

const onItemClick = (item: any) => {
    if (item.address.length > 0) {
        window.open(item.address.startsWith("http") ? item.address : "http://" + item.address)
    }
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
                            관심 상품
                        </p>
                    </div>
                    <Line class="mt-[15px] border-b-[2px]" />
                    <div class="w-full mt-[15px] lg:mt-[30px]">
                        <el-dropdown class="w-full" trigger="click" @command="handleCommand">
                            <button class="dropdown-btn el-dropdown-link"
                                :class="commandList.find(it => it.selected) ? 'text-warmGray-900' : 'text-secondarynavy-300'">
                                <span>
                                    {{ commandList.find(it => it.selected)?.name || "전체" }}
                                </span>
                                <span>▼</span>
                            </button>
                            <template #dropdown>
                                <el-dropdown-menu v-for="(command, index) in commandList" :key="index">
                                    <el-dropdown-item :command="command.name">
                                        <button class="w-[300px] md:w-[690px] lg:w-[840px]">
                                            <span>
                                                {{ command.name }}
                                            </span>
                                        </button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div
                        class="mt-[40px] lg:mt-[22px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[82px] gap-y-[20px] md:gap-y-[40px] lg:gap-y-[32px]">
                        <div v-for="item in wishList">
                            <CardProduct v-if="item.type == WishEntityType.Product && item.item" :product="item.item" />
                            <CardHouse v-else-if="item.type == WishEntityType.ExpertHouse && item.item" :item="item.item"
                                :onClick="() => { navigateTo(`/construction-ex/detail?id=${item.id}&isExpertType=${item.type == WishEntityType.ExpertHouse}`) }" />
                            <CardHouse v-else-if="item.type == WishEntityType.OnlineHouse && item.item" :item="item.item"
                                :onClick="() => { navigateTo(`/construction-ex/detail?id=${item.id}&isExpertType=${item.type == WishEntityType.ExpertHouse}`) }" />
                            <CardSmartStore v-else-if="item.type == WishEntityType.SmartStore && item.item"
                                :item="item.item" @click="onItemClick(item.item)" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>