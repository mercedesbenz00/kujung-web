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
    <button class="h-[54px] border text-white hover:bg-secondaryNavy-600 text-center text-[15px] leading-[20px] font-bold"
        :class="props.selected ? 'bg-secondaryNavy-600 border-secondaryNavy-800' : 'bg-secondaryNavy-200 border-secondaryNavy-400'"
        @click="onClick()">{{ props.text
        }}</button>
</template>