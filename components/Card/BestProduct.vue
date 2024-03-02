<script lang="ts" setup>

// props
const props = defineProps({
    imageUrl: {
        type: String,
        default: undefined
    },
    title: {
        type: String,
        default: undefined
    },
    category1: {
        type: String,
        default: undefined
    },
    category2: {
        type: String,
        default: undefined
    }
});

</script>
<template>
    <div class="flex flex-row gap-[14px] cursor-pointer w-full">
        <img :src="props.imageUrl" :alt="props.title" class="w-[200px] h-[126px] object-cover" />
        <div class="flex flex-col flex-1">
            <span class="text-caption1">{{ props.category1 }}<i v-if="props.category2" class="las la-angle-right"></i>{{
                props.category2 }}</span>
            <span class="font-bold text-[18px] leading-[22px]">{{ props.title }}</span>
        </div>
    </div>
</template>