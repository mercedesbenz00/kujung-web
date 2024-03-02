<script setup lang="ts">
import { Category } from '~/ts/interfaces/Category';
import { Product } from "~/ts/interfaces/Product";
import { api } from '~~/ts/api';

const props = defineProps({
    category: {
        type: Object as PropType<Category>,
        default: undefined
    }
});

const commandList = ref([{ name: "인기순", selected: true, order: "DESC", sortBy: "popularity" }, { name: "제품 최신순", selected: true, order: "DESC", sortBy: "created_at" }])

const totalCnt = ref<number>(0)
const TAKE_COUNT = 9
const currentPage = ref<number>(1)

const list = ref<Product[]>([])

onMounted(() => {
    loadProductList(1)
})

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    loadProductList(1)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    loadProductList(val)
}

const loadProductList = (p_page: number) => {
    currentPage.value = p_page
    api.post('/product/list', {
        needAllCount: true,
        page: p_page,
        take: TAKE_COUNT,
        sortBy: commandList.value.find(it => it.selected)?.sortBy,
        order: commandList.value.find(it => it.selected)?.order,
    })
        .then(response => {
            list.value = response.data.items
            totalCnt.value = response.data.meta.totalCount
        })
}
</script>


<template>
    <div class="w-full flex flex-col justify-center">
        <ProductRecommendList :isGlobalRecommend="true" class="mb-[50px] md:mb-[120px] block lg:hidden" />
        <div class="flex flex-col w-full max-w-[1080px] mb-[100px]">
            <div class="px-[10px] lg:px-[0px] ">
                <div class="flex flex-row md:px-[0px] w-full items-end">
                    <p class="text-[18px] md:text-[24px] font-bold text-black">전체 제품보기
                    </p>
                    <p class="ml-[6px] md:ml-[16px] text-[11px] md:text-[18px]">전체 {{ totalCnt }}개</p>
                    <div class="flex-1" />
                    <section class="flex self-end justify-end">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <el-button class="el-dropdown-link w-[120px]">
                                {{ commandList.find(it => it.selected)?.name }}&nbsp;&nbsp;&nbsp;&nbsp; ▼
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu v-for="(command, index) in commandList" :key="index">
                                    <el-dropdown-item :command="command.name">{{ command.name }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </section>
                </div>
                <Line class="mt-[10px] lg:max-w-[1080px]" />
            </div>
            <div
                class="mt-[50px] md:mt-[40px] lg:mt-[22px] px-[8px] md:px-[0px] grid grid-cols-3 gap-x-[6px] lg:gap-x-[82px] gap-y-[20px] md:gap-y-[40px] lg:gap-y-[32px]">
                <CardProduct v-for="item in list" :product="item" />
            </div>
        </div>

        <section class="flex flex-row justify-center mb-[110px] items-center">
            <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background layout="prev, jumper, next"
                :total="totalCnt" @current-change="handleCurrentChange" />
            <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
        </section>
    </div>
</template>

<style lang="scss"></style>