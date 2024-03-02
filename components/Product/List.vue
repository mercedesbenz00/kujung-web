<script setup lang="ts">
import { Category } from '~/ts/interfaces/Category';
import { Product } from '~/ts/interfaces/Product';
import { api } from '~/ts/api';

const props = defineProps({
    category: {
        type: Object as PropType<Category>,
        default: undefined
    }
});

onMounted(() => {
    loadProductList(true)
})

const commandList = ref([{ name: "인기순", selected: true, order: "DESC", sortBy: "popularity" }, { name: "제품 최신순", selected: true, order: "DESC", sortBy: "created_at" }])

const list = ref<Product[]>([])

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    loadProductList(true)
}

const loadProductList = (p_refresh: boolean) => {
    if (p_refresh) {
        list.value = []
    }
    var payLoad = {}
    if (props.category?.depth == 0) {
        payLoad = {
            category_level1_id: props.category?.id
        }
    } else if (props.category?.depth == 1) {
        payLoad = {
            category_level1_id: props.category?.parentId,
            category_level2_id: props.category?.id
        }
    } else if (props.category?.depth == 2) {
        payLoad = {
            category_level1_id: props.category?.parent?.parentId,
            category_level2_id: props.category?.parentId,
            category_level3_id: props.category?.id
        }
    }
    api.post('/product/list', {
        needAllCount: true,
        sortBy: commandList.value.find(it => it.selected)?.sortBy,
        order: commandList.value.find(it => it.selected)?.order,
        ...payLoad
    })
        .then(response => {
            list.value = response.data.items
        })
}

</script>


<template>
    <div class="w-full flex justify-center">
        <div class="flex flex-col w-full max-w-[1080px]">
            <div class="px-[10px] lg:px-[0px] ">
                <div class="flex flex-row md:px-[0px] w-full items-end">
                    <p class="text-[18px] md:text-[24px] font-bold text-black">{{ props.category?.name }} 수종
                    </p>
                    <p class="ml-[6px] md:ml-[16px] text-[11px] md:text-[18px]">전체 {{ list.length }}개</p>
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
                class="mt-[50px] md:mt-[40px] lg:mt-[22px] px-[8px] md:px-[0px] grid grid-cols-3 lg:grid-cols-4 gap-x-[6px] lg:gap-x-[32px] gap-y-[20px] md:gap-y-[40px] lg:gap-y-[32px]">
                <CardProduct v-for="item in list" :product="item" />
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>