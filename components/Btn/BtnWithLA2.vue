<script lang="ts" setup>

// props
const props = defineProps({
    text: {
        type: String,
        default: undefined
    },
    laName: {
        type: String,
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
    <button @click="(e: any) => onClick(e)" type="button"
        class="border-[1px] bg-warmGray-200 border-warmGray-600 px-[12px] flex flex-row items-center">
        <p class="text-[11px] leading-[11px] font-bold">
            {{ props.text }}
        </p>
        &nbsp;
        <i :class="laName + ' text-[16px] font-bold leading-[16px] mt-[-2px]'"></i>
    </button>
</template>