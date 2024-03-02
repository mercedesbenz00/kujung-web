<script lang="ts" setup>

// props
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  processImg: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
});

</script>
<template>
  <section :class="'w-[150px] md:w-[180px] lg:w-[320px]'">
    <div class="relative">
      <img :src="props.processImg" class="w-full cursor-pointer" :class="'h-[150px] md:h-[180px] lg:h-[320px]'" />
    </div>
    <section class="mt-[10px] md:mt-[20px]">
      <section class="flex flex-row items-center justify-center">
        <div
          class="w-[15px] md:w-[18px] lg:w-[25px] h-[15px] md:h-[18px] lg:h-[25px] flex items-center justify-center bg-primary-600 rounded-[50%]">
          <span class="text-center text-white text-[10px] md:text-[12px] lg:text-[16px]">
            {{ props.index }}
          </span>
        </div>
        <span class="ml-[5px] text-black text-[12px] md:text-[15px] lg:text-[22px]">{{ props.title }}</span>
      </section>
    </section>
  </section>
</template>
