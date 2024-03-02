<script lang="ts" setup>
import { PointLog } from '~/ts/interfaces/PointLog';
import dayjs from 'dayjs';

// props
const props = defineProps({
    item: {
        type: Object as PropType<PointLog>,
        default: null
    },
});

</script>
<template>
    <div class="flex flex-row py-[20px] md:py-[24px] gap-x-[10px] md:gap-x-[20px] items-center">
        <p class="text-[8px] md:text-[13px] lg:text-[18px] text-black text-center flex-[98]">
            {{ dayjs(item?.created_at).format("YYYY/MM/DD HH:MM") }}
        </p>
        <p class="text-[8px] md:text-[13px] lg:text-[18px] text-black text-center flex-[266] line-clamp-2">
            {{ item.memo }}
        </p>
        <p class="text-[8px] md:text-[13px] lg:text-[18px] text-black text-center flex-[142]">
            {{ item.point > 0 ? "적립" : "차감" }}
        </p>
        <div class="flex flex-row flex-[93] items-center justify-center">
            <p class="text-[11px] md:text-[13px] lg:text-[18px] text-primary-500 text-center font-bold mr-[8px]">
                {{ item.point?.toLocaleString() }}
            </p>
            <div class="relative flex items-center justify-center">
                <img src="/img/bg_point.png" class="w-[16px] md:w-[22px] h-[16px] md:h-[22px]" />
                <p class="absolute text-[11px] leading-[15px] md:text-[13px] md:leading-[18px] text-white font-bold">P</p>
            </div>
        </div>
    </div>
    <LineGray />
</template>