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
});

</script>
<template>
    <button
        class="border border-[black] text-white hover:bg-black text-center"
        :class="props.selected ? 'bg-black' : 'bg-secondaryNavy-200'"
        >{{ props.text }}</button>
</template>