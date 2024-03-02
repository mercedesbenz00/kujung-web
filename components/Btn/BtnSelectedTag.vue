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
    <button
     class="text-[12px] md:text-[15px] rounded-[6px] h-[30px] px-[17px] text-white"     
     :class="isBlueBg ? 'bg-secondaryBlue-400' : 'bg-primary-400'"
     >{{ props.text
    }}
        <i class="las la-times text-[white]"></i>
    </button>
</template>