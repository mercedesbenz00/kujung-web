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
        class="w-[256px] md:w-[242px] h-[40px] md:h-[60px] border hover:bg-secondaryNavy-600 text-center text-[15px] leading-[20px] font-bold md:flex-1 self-center"
        :class="props.selected ? 'bg-secondaryNavy-600 border-warmGray-800 text-white' : 'bg-warmGray-400 border-warmGray-600 text-warmGray-700'"
        @click="onClick()">{{ props.text
        }}</button>
</template>