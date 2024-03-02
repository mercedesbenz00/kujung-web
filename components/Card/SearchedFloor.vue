<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { Product } from '~/ts/interfaces/Product';


// props
const props = defineProps({
    item: {
        type: Object as PropType<Product>,
        default: undefined
    },
    selected: {
        type: Boolean,
        default: false,
    },
    onClick: {
        type: Function,
        default() {
        }
    }
});

</script>
<template>
    <div class="flex flex-row gap-[14px] w-full cursor-pointer p-[4px]" :class="selected ? 'bg-secondaryNavy-400' : ''"
        @click="onClick()">
        <img :src="item?.thumbnail_url" class="w-[96px] lg:w-[150px] h-[64px] lg:h-[100px]" :alt="item?.title" />
        <div class="flex flex-col">
            <span class="text-[11px] text-warmGray-600">{{ item?.category_level1?.name }}
                <i class="las la-angle-right"></i>&nbsp;<span class="text-[#1A1A1A]">{{ item?.category_level2?.name
                }}</span></span>
            <span class="font-bold text-[18px] leading-[22px]" :class="selected ? 'text-white' : ''">{{ item?.title }}</span>
        </div>
    </div>
</template>