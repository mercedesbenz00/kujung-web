<script lang="ts" setup>
import { Common } from '~/ts/_utils/common';
import { Product } from '~/ts/interfaces/Product';
import { api } from '~/ts/api';
import { WishEntityType } from '~/ts/constants';

// props
const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        default: undefined
    },
});

const wish = async (e: any) => {
    e.stopPropagation()
    Common.checkLogin(async () => {
        await api.post(`/wish`, {
            "type": WishEntityType.Product,
            "entity_id": props.product?.id
        })
        props.product!.wished = true
    })
}
const wishCancel = async (e: any) => {
    e.stopPropagation()
    Common.checkLogin(async () => {
        await api.post(`/wish/cancel`, {
            "type": WishEntityType.Product,
            "entity_id": props.product?.id
        })
        props.product!.wished = false
    })
}

</script>
<template>
    <div class="relative flex flex-col w-full h-full max-w-[116px] md:max-w-[232px] lg:max-w-[250px] cursor-pointer"
        @click="navigateTo(`/product/detail?id=${props.product.id}`)">
        <div class="relative">
            <img :src="Common.getThumbnailUrl(product?.thumbnail_url)" class="w-full h-[100px] md:h-[200px] object-cover"
                :alt="product?.title + '' + product?.desc" />
            <div class="absolute right-[3px] top-[2px] md:right-[6px] md:top-[3px]" @click="() => { }">
                <font-awesome-icon v-if="product?.wished" icon="fa-solid fa-bookmark"
                    class="text-[15px] md:text-[22px] text-primary-500" @click="wishCancel" />
                <font-awesome-icon v-if="!product?.wished" icon="fa-regular fa-bookmark"
                    class="text-[15px] md:text-[22px] text-white" @click="wish" />
            </div>
            <div class="absolute left-[3px] top-[3px] md:left-[6px] md:top-[6px] flex flex-col gap-[4px]">
                <div v-if="product?.selected_icons.includes('Best')" class="bg-[#B40F0F] w-[25px] h-[15px] md:w-[44px] md:h-[27px] rounded-[7px] md:rounded-[13px] flex items-center justify-center">
                    <p class="text-white text-[7px] md:text-[11px] font-bold">Best</p>
                </div>
                <div v-if="product?.selected_icons.includes('New')" class="bg-[#0E331D] w-[25px] h-[15px] md:w-[44px] md:h-[27px] rounded-[7px] md:rounded-[13px] flex items-center justify-center">
                    <p class="text-white text-[7px] md:text-[11px] font-bold">New</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col mt-[6px] md:mt-[10px]">
            <div class="flex flex-row items-center mb-[6px] ">
                <p class="text-[8px] md:text-[11px] text-warmGray-600">{{ product?.category_level1?.name }}</p>
                <i class="la la-angle-right text-[8px] md:text-[11px] text-warmGray-600 mx-[8px]"></i>
                <p class="text-[8px] md:text-[11px] text-[#1A1A1A] font-bold">{{ product?.category_level2?.name }}</p>
            </div>
            <p class="text-[12px] md:text-[13px] text-[#1A1A1A] leading-[16px] md:leading-[18px] font-bold text-start">
                {{ product?.title }}
            </p>
            <p
                class="text-[6px] md:text-[12px] text-black leading-[15px] md:leading-[16px] mt-[6px] text-start line-clamp-2">
                <span v-for="(tag, index) in product?.tags" :key="index">
                    {{ tag.name }} <span v-if="index < product?.tags?.length! - 1">| </span>
                </span>
            </p>
        </div>
    </div>
</template>