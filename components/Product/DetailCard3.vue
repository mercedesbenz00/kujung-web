<script lang="ts" setup>
import { Product } from '~/ts/interfaces/Product';
// props
const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        default: undefined
    },
});
</script>

<template>
    <div class="flex flex-col gap-[6px] w-[116px] md:w-[175px] lg:md:w-[232px] cursor-pointer"
        @click="navigateTo(`/product/detail?id=${product?.id}`)">
        <img :src="product?.thumbnail_url" class="w-full h-[100px] md:h-[175px] lg:h-[200px]"
            :alt="product?.title + '' + product?.desc" />
        <div class="flex flex-row items-center mx-[4px]">
            <span class="text-[8px] md:text-[11px] text-warmGray-600">{{ product?.category_level1?.name }}</span>
            <i class="las la-angle-right text-[8px] md:text-[11px] text-warmGray-600"></i>
            <span class="text-[8px] md:text-[11px] text-black font-bold">{{ product?.category_level2?.name }}</span>
        </div>
        <span class="text-[12px] md:text-[13px] text-black font-bold mx-[4px]">{{ product?.title }}</span>
    </div>
</template>