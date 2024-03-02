<script lang="ts" setup>
import { Common } from '~/ts/_utils/common';
import { PropType } from 'nuxt/dist/app/compat/capi';
import { Category } from '~/ts/interfaces/Category';

// props
const props = defineProps({
    item: {
        type: Object as PropType<Category>,
        default: undefined
    },
    onClick: {
        type: Function,
        default(e: any) {

        }
    }
});

</script>
<template>
    <div class="relative flex flex-col w-full max-w-[180px] md:max-w-[360px] lg:max-w-[320px]">
        <div class="relative">
            <img :src="Common.getThumbnailUrl(item?.image_url)"
                class="w-full h-[135px] md:h-[270px] lg:h-[240px] object-cover" :alt="item?.name" />
        </div>
        <div class="flex flex-col">
            <p class="text-[15px] md:text-[18px] text-black font-bold mt-[10px] md:mt-[20px] ml-[4px]">{{ item?.name }}
            </p>
            <div :innerHTML="item?.desc"
                class="text-[11px] md:text-[15px] leading-[15px] md:leading-[20px] text-black mt-[10px] line-clamp-3 md:mx-[20px] lg:mx-[2px]">
            </div>
            <div
                class="mt-[10px] md:mt-[20px] text-[11px] md:text-[12px] text-[#1A6CAB] block line-clamp-2 h-[33px] md:h-[36px]">
                <span v-for="tag in item?.tags.split(',')" class="text-[11px] md:text-[12px] text-[#1A6CAB] mr-[10px]">
                    #{{ tag }}
                </span>
            </div>
        </div>

        <BtnThird class="mt-[14px] h-[35px] md:h-[32px] text-[11px] md:text-[13px]" :text="item?.name + ' 제품 보러가기'"
            @click="(e: any) => { onClick(e) }" />
    </div>
</template>