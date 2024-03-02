<script lang="ts" setup>

// props
const props = defineProps({
    text: {
        type: String,
        default: undefined
    },
    class: {
        type: String,
        default: undefined
    }
});

</script>
<template>
    <section>
        <button
            class="bg-primary-300 text-white rounded-[100px] cursor-pointer px-[15px] py-[10px] text-[12px] md:text-[15px] lg:text-[22px] leading-[22px] lg:leading-[30px] "
            :class="props.class">{{ props.text }}</button>
    </section>
</template>