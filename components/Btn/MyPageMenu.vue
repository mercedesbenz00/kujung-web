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
        default(e: any) {
        }
    }
});

</script>
<template>
    <button
        class="px-[10px] md:px-[10px] py-[15px] md:py-[20px] hover:bg-primary-300 text-black hover:text-white cursor-pointer text-[13px] md:text-[18px] font-bold w-full"
        :class="props.selected ? 'bg-primary-300 text-white' : 'bg-transparent'" @click="(e: any) => onClick(e)">{{
            props.text }}</button>
</template>