<script lang="ts" setup>
import { ProductBlog } from '~/ts/interfaces/ProductBlog';

// props
const props = defineProps({
    item: {
        type: Object as PropType<ProductBlog>,
        default: null
    },
});

</script>
<template>
    <a :href="item.url" target="_blank" class="flex flex-row gap-[10px] md:gap-[14px] lg:gap-[30px] w-full md:max-w-[446px] lg:max-w-[493px]">
        <img :src="item.thumb_url" class="w-[162px] md:w-[232px] h-[137px] md:h-[200px] object-cover" :alt="item.title" />
        <div class="flex flex-col flex-1 mt-[6px] w-full">
            <span class="text-[13px] text-black font-bold">{{ item.title }}</span>
            <span class="text-[13px] text-black mt-[6px]">{{ item.summary }}</span>
        </div>
    </a>
</template>