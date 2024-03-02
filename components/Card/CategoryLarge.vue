<script lang="ts" setup>
import { Common } from '~/ts/_utils/common';
import { Category } from '~/ts/interfaces/Category';


// props
const props = defineProps({
    item: {
        type: Object as PropType<Category>,
        default: {}
    },
    onClick: {
        type: Function,
        default: (e: any) => {

        }
    }
});

</script>
<template>
    <div class="relative flex flex-col w-full max-w-[180px] md:max-w-[360px] lg:max-w-[320px]">
        <div class="relative">
            <img :src="Common.getThumbnailUrl(item.image_url)" class="h-[135px] w-full md:h-[270px] lg:h-[240px]" :alt="item.name + item.tags" />
            <div class="absolute left-0 top-0 right-0 bottom-0 flex opacity-0 hover:opacity-100">
                <div @click="(e: any) => { onClick(e) }"
                    class="w-full h-[40px] md:h-[56px] lg:h-[50px] relative self-end flex justify-center items-center cursor-pointer">
                    <div class="absolute w-full h-full bg-black opacity-60">
                    </div>
                    <span class="text-[12px] md:text-[13px] text-white z-20">
                        {{ item.name }} 제품 보러가기
                    </span>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <p class="text-[15px] md:text-[18px] text-black font-bold mt-[10px] md:mt-[20px] ml-[4px]">{{ item.name }}</p>
            <div :innerHTML="item.desc"
                class="text-[11px] md:text-[15px] leading-[15px] md:leading-[20px] text-black mt-[10px] line-clamp-3 md:mx-[20px] lg:mx-[2px]">
            </div>
            <div class="mt-[10px] md:mt-[20px] block">
                <p v-for="tag in item.tags.split(',')" @click="navigateTo(`/search?keyword=${tag}`)"
                    class="text-[11px] md:text-[12px] text-[#1A6CAB] mr-[10px] float-left cursor-pointer">
                    #{{ tag }}
                </p>
            </div>
        </div>
    </div>
</template>