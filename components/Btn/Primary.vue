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
        class="py-[12px] lg:py-[20px] border border-[black] text-black hover:text-white hover:bg-black text-center text-[12px] md:text-[18px] leading-[22px]"
        :class="props.selected ? 'bg-black text-white' : 'bg-warmGray-400'"
        @click="onClick()"
        >{{ props.text }}</button>
</template>