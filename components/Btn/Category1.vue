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
    <div>
        <button
            class="px-[9px] md:px-[15px] py-[3px] md:py-[5px] hover:bg-secondaryNavy-400 text-warmGray-800 hover:text-white cursor-pointer text-[15px] rounded-[6px]"
            :class="props.selected ? 'bg-secondaryNavy-400 text-white' : 'bg-warmGray-500'" @click="(e: any) => onClick(e)">{{
                props.text }}</button>
    </div>
</template>