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
        class="h-[60px] border border-warmGray-600 bg-warmGray-400 hover:bg-warmGray-900 text-center text-[18px] text-warmGray-700 hover:text-white"
        :class="props.selected ? 'bg-warmGray-900 text-white' : 'bg-warmGray-400'" @click="onClick()">{{ props.text
        }}</button>
</template>