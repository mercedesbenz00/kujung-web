<script lang="ts" setup>

const emit = defineEmits(['some-event'])
// props
const props = defineProps({
    text: {
        type: String,
        default: undefined
    },
    isBlueBg: {
        type: Boolean,
        default: false
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
    <button class="text-[12px] md:text-[15px] rounded-[6px] h-[30px] px-[17px]"
        :class="props.selected ? (isBlueBg ? 'bg-secondaryBlue-400 text-white' : 'bg-primary-400 text-white') : 'text-warmGray-800'"
        @click="onClick()">{{ props.text
        }}</button>
</template>