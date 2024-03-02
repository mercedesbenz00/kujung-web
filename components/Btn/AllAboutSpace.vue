<script lang="ts" setup>

const emit = defineEmits(['some-event'])
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
        class="h-[30px] w-[98px] md:w-[112px] lg:w-[126px] focus:outline-0 border-t-[5px] border-t-warmGray-600 hover:border-t-warmGray-900 text-center text-[11px] md:text-[13px] lg:text-[15px] leading-[15px] md:leading-[18px] lg:leading-[20px]"
        :class="props.selected ? 'text-warmGray-900 border-t-warmGray-900' : 'text-warmGray-600 border-t-warmGray-600'"
        @click="onClick()">{{ props.text
        }}</button>
</template>