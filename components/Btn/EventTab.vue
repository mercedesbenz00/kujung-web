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
    <button class="h-[40px] lg:h-[60px] border hover:bg-warmGray-900 text-center text-[15px] leading-[20px] font-bold border-warmGray-600"
        :class="props.selected ? 'bg-warmGray-900 text-white' : 'bg-warmGray-400 text-warmGray-700'"
        @click="onClick()">{{ props.text
        }}</button>
</template>