<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { HouseEntity } from '~/ts/constants';
import { House } from '~/ts/interfaces/House';

// props
const props = defineProps({
    item: {
        type: Object as PropType<House>,
        default: null
    },
});

</script>
<template>
    <div class="flex flex-col gap-[6px] w-[160px] md:w-[232px] cursor-pointer"
        :onClick="() => { navigateTo(`/construction-ex/detail?id=${item.id}&isExpertType=${item.entity_type == HouseEntity.EXPERT}`) }">
        <img :src="item.entity_type == HouseEntity.ONLINE ? item.images?.[0] : item.thumb_url"
            class="h-[137px] md:h-[200px] object-cover" :alt="item.title" />
        <span class="text-[13px] text-black font-bold mx-[4px]">{{ item.entity_type == HouseEntity.ONLINE ? "랜선집들이" :
            "전문가집들이" }}</span>
        <p class="text-warmGray-800 text-[13px] text-black md:leading-[16px] mx-[4px]">
            <span class="" v-for="(tag, index) in item.tags" :key="index">
                {{ tag }} <span v-if="index < item.tags?.length! - 1">| </span>
            </span>
        </p>
    </div>
</template>