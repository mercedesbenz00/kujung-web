<script lang="ts" setup>

// props
const props = defineProps({
    text: {
        type: String,
        default: undefined
    },
    selected: {
        type: Boolean,
        default: false
    },
    onClick: {
        type: Function,
        default() {
        }
    }
});

</script>
<template>
    <button
        class="px-[9px] md:px-[15px] py-[3px] md:py-[5px] hover:bg-primary-300 text-warmGray-800 hover:text-white cursor-pointer text-[15px] rounded-[6px]"
        :class="props.selected ? 'bg-primary-300 text-white' : 'bg-transparent'" @click="(e: any) => onClick(e)">{{
            props.text }}</button>
</template>