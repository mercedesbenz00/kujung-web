<script lang="ts" setup>
import dayjs from 'dayjs';
import { SmartcareService } from '~/ts/interfaces/SmartcareService';

// props
const props = defineProps({
    item: {
        type: Object as PropType<SmartcareService>,
        default: null
    },
    index: {
        type: String,
        default: ""
    },
});

</script>
<template>
    <div class="flex flex-row py-[20px] md:py-[24px] gap-x-[10px] md:gap-x-[20px] items-center w-full">
        <p class="text-[8px] md:text-[12px] leading-[16px] text-black text-center flex-[98]">
            {{ index + 1 }}
        </p>
        <p class="text-[8px] md:text-[12px] leading-[16px] text-black text-center flex-[120] line-clamp-2">
            {{ dayjs(item?.created_at).format("YYYY/MM/DD HH:mm") }}
        </p>
        <p class="text-[8px] md:text-[12px] leading-[16px] text-black text-center flex-[122]">
            {{ item.product_name }}
        </p>
        <p class="text-[8px] md:text-[12px] leading-[16px] text-black text-center flex-[266]">
            {{ item.special_note || "-" }}
        </p>
        <p class="text-[8px] md:text-[12px] leading-[16px] text-black text-center flex-[93]">
        </p>
    </div>
</template>